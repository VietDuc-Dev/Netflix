import dbConfig from "./tmdb.config.js";

const dbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) =>
    dbConfig.getUrl(`${mediaType}/${mediaCategory}`, { page }),

  mediaDetail: ({ mediaType, mediaId }) =>
    dbConfig.getUrl(`${mediaType}/${mediaId}`),

  mediaGenres: ({ mediaType }) => dbConfig.getUrl(`genre/${mediaType}/list`),

  mediaCredits: ({ mediaType, mediaId }) =>
    dbConfig.getUrl(`${mediaType}/${mediaId}/credits`),

  mediaVideos: ({ mediaType, mediaId }) =>
    dbConfig.getUrl(`${mediaType}/${mediaId}/videos`),

  mediaRecommend: ({ mediaType, mediaId }) =>
    dbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),

  mediaImages: ({ mediaType, mediaId }) =>
    dbConfig.getUrl(`${mediaType}/${mediaId}/images`),

  mediaSearch: ({ mediaType, query, page }) =>
    dbConfig.getUrl(`search/${mediaType}`, { query, page }),

  personDetail: ({ personId }) => dbConfig.getUrl(`person/${personId}`),

  personMedias: ({ personId }) =>
    dbConfig.getUrl(`person/${personId}/combined_credits`),
};

export default dbEndpoints;
