export const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "43667403-4c45514ac315f0254a0ab6c0f";

export const options = {
    params: {
        key: API_KEY,
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
    }
}