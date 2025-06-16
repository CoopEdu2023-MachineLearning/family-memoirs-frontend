import { AutoComplete, Card, Flex, List, Space, Tag, Typography, Input } from "antd";
import { DeleteOutlined, SearchOutlined, AppstoreOutlined } from "@ant-design/icons";
import { highlightTeller, highlightStory } from "@features/search/searchUtils";
import { useSearch } from "@features/search/useSearch";
import { getSearchHistory, removeFromHistory } from "@features/search/searchHistory";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const SearchHistory = ({ history, onSelect, onDelete }) => {
  const [closable, setClosable] = useState(false);

  if (!history.length) return null;

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space align="center">
        <Title level={5} style={{ margin: 0 }}>历史搜索</Title>
        <DeleteOutlined
          onClick={() => setClosable(!closable)}
          style={{
            cursor: "pointer",
            fontSize: 16,
            color: closable ? "red" : "inherit",
          }}
        />
      </Space>
      <Space size={4} wrap>
        {/* Antd tags have automatic margin-inline-end of 8px */}
        {history.map((item) => (
          <Tag
            key={item}
            onClick={() => onSelect(item)}
            closable={closable}
            onClose={(e) => {
              e.stopPropagation();
              onDelete(item);
            }}
            className={styles.tag}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
          >
            <Text ellipsis style={{ maxWidth: 100 }}>
              {item}
            </Text>
          </Tag>
        ))}
      </Space>
    </Space>
  );
};

const ListOptionGroup = ({ title, dataSource, emptyMessage }) => (
  <Space direction="vertical" style={{ width: "100%" }}>
    <Title level={5} style={{ margin: 0 }}>{title}</Title>
    {dataSource.length > 0 ? (
      <List
        dataSource={dataSource}
        size="small"
        renderItem={(item) => (
          <List.Item
            key={item.key}
            onClick={item.onSelect}
            style={{
              transition: "background-color 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
          >
            {item.label}
          </List.Item>
        )}
      />
    ) : (
      <Text className="lowest-level-text-color">{emptyMessage}</Text>
    )}
  </Space>
);

const SuggestionPanel = ({ stories, tellers, inputValue, onSelect, onStorySelect }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const handleDelete = (query) => {
    const newHistory = removeFromHistory(query);
    setHistory(newHistory);
  };

  const renderedStories = stories.slice(0, 3).map(highlightStory).map((story) => ({
    key: story.story,
    label: <Text ellipsis style={{ textWrap: "nowrap" }}>{story.renderedStory}</Text>,
    onSelect: () => onStorySelect(story.articleId),
  }));

  const renderedTellers = tellers
    .slice(0, 2)
    .map((teller) => highlightTeller(teller, inputValue))
    .map((teller) => ({
      key: teller.name,
      label: (
        <Flex align="center" justify="start">
          {teller.renderedName}
        </Flex>
      ),
      onSelect: () => onSelect(teller.name),
    }));

  return (
    <Card
      className={styles.panel}
      styles={{ body: { padding: 0 } }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Space direction="vertical" className={styles.panelContent}>
        {inputValue ? (
          <>
            <ListOptionGroup
              title="内容"
              dataSource={renderedStories}
              emptyMessage="暂无结果"
            />
            <ListOptionGroup
              title="人物"
              dataSource={renderedTellers}
              emptyMessage="暂无结果"
            />
          </>
        ) : (
          <SearchHistory
            history={history}
            onSelect={onSelect}
            onDelete={handleDelete}
          />
        )}
      </Space>
    </Card>
  );
};

export const AutoCompleteSearch = ({ stories, tellers, refine }) => {
  const { inputValue, handleChange, handleSearch } = useSearch(refine, "");
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={styles.root}>
      <div className={styles.headerRow}>
        <div
          className={styles.inputWrapper}
          onMouseDown={e => e.preventDefault()}
        >
          <Input
            ref={inputRef}
            placeholder="请输入关键词"
            prefix={<SearchOutlined />}
            className={styles.searchInput}
            onPressEnter={() => handleSearch(inputValue)}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <img
          className={styles.floatingButton}
          src="/homePageStateButton/stateButtonDrawer.svg"
          alt="State Button Drawer"
        />
      </div>
      {isFocused && (
        <SuggestionPanel
          stories={stories}
          tellers={tellers}
          inputValue={inputValue}
          onSelect={(query) => handleSearch(query)}
          onStorySelect={(id) => navigate(`/article/${id}`)}
        />
      )}
    </div>
  );
};