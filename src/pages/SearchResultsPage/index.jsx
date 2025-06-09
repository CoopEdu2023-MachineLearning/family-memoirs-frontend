import { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { Checkbox, Col, Input, Row, Space, Tabs } from "antd";
import { highlightTeller, highlightStory, highlightUser, noHighlightStory } from "@features/search/searchUtils";
import { search } from "@apis";
import { useSearch } from "@features/search/useSearch";
import InterviewCard from "@components/Waterfallcard";

const { Search } = Input;

export const SearchBox = ({ refine, defaultValue, ...props }) => {
    const { inputValue, handleChange, handleSearch } = useSearch(refine, defaultValue);

    return <Search
        placeholder="请输入关键词"
        enterButton
        value={inputValue}
        onChange={(e) => {
            handleChange(e.target.value);
        }}
        onSearch={handleSearch}
        size="large"
        style={{ maxWidth: 600, width: "100%" }}
        {...props}
    />;
};

const StoryList = ({ stories }) => (
    <Row gutter={[16, 16]}>
        {stories.map((story, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
                <InterviewCard description={story.story} tags={story.tags} />
            </Col>
        ))}
    </Row>
);

export const SearchResultsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || ""; // Get the 'query' parameter
    const [currentQuery, setCurrentQuery] = useState(query);
    const [stories, setStories] = useState([]);
    const [tellers, setTellers] = useState([]);
    const [users, setUsers] = useState([]);
    const [preciseSearch, setPreciseSearch] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    const refine = useCallback(async (value) => {
        const { stories, tellers, users } = await search(value, undefined, preciseSearch);
        setCurrentQuery(value);
        setStories(stories);
        setTellers(tellers);
        setUsers(users);
    }, [preciseSearch]);

    return (
        <>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Row justify="center">
                    <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                        <SearchBox refine={refine} defaultValue={query || ""} />
                    </Col>
                </Row>
                <Row gutter={16} justify="center">
                    <Col xs={24} sm={16} md={18}>
                        <Tabs
                            centered
                            defaultActiveKey="1"
                            activeKey={activeTab}
                            onChange={key => {
                                setActiveTab(key);
                            }}
                            tabBarExtraContent={
                                activeTab === "1" ? (
                                    <div style={{ position: "absolute", right: 0, top: 0, display: "flex", alignItems: "center", height: 48 }}>
                                        <Checkbox
                                            checked={preciseSearch}
                                            onChange={e => setPreciseSearch(e.target.checked)}>
                                                精确搜索
                                        </Checkbox>
                                    </div>
                                ) : null
                            }
                        >
                            <Tabs.TabPane tab="内容" key="1">
                                <StoryList stories={stories.map(preciseSearch ? highlightStory : noHighlightStory)} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="讲述者" key="2">
                                <div style={{ textAlign: "center", padding: "20px" }}>
                                    {tellers.map((teller) => highlightTeller(teller, currentQuery)).map((n, i) => <p key={i}>{n.renderedName}</p>)}
                                    {tellers.length === 0 && "暂无结果"}
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="用户" key="3">
                                <div style={{ textAlign: "center", padding: "20px" }}>
                                    {users.map((user) => highlightUser(user, currentQuery)).map((u, i) => <p key={i}>{u.renderedName}</p>)}
                                    {users.length === 0 && "暂无结果"}
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Space>
        </>
    );
}
