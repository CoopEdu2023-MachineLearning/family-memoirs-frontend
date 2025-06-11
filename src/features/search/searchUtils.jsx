import { HighlightText } from '../../components/HighlightText';

const getHighlights = (item) => (
  Object.fromEntries(item.highlights.map(highlight => [highlight.field, highlight.value || highlight.snippet]))
);

const markAllCharacterMatches = (text, query) => {
  // This function marks all occurrences of any character of query in the text
  // Query may contain special characters, so we need to escape them
  if (!text || !query) return text;
  const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // Escape special characters
  const regex = new RegExp(`([${escapedQuery}])`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const highlightStory = (item) => {
  const highlights = getHighlights(item);
  return {
    ...item.document,
    renderedStory: <HighlightText text={highlights.story || item.document.story} />
  };
};

export const noHighlightStory = (item) => {
  return {
    ...item.document,
    renderedStory: item.document.story
  };
};

export const highlightTeller = (item, query) => {
  return {
    ...item.document,
    renderedName: <HighlightText text={markAllCharacterMatches(item.document.name, query)} />
  };
};

export const highlightUser = (item, query) => {
  return {
    ...item.document,
    renderedName: <HighlightText text={markAllCharacterMatches(item.document.name, query)} />
  };
};
