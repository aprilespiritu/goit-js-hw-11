import { BASE_URL, options } from "./pixabay-api.js";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio.js";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

//Target Elements
const galleryE = document.querySelector('.gallery');
const searchInputE = document.querySelector('input[name="searchQuery"]');
const searchFormE = document.querySelector("search-form");

let reachEnd = false;
let totalHits = 0;

function renderGallery(hits) {
    hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `
                <a href="${largeImageURL}" class='lightbox'>
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                        <b>${likes}</b>
                        </p>
                        <p class="info-item">
                        <b>${views}</b>
                        </p>
                        <p class="info-item">
                        <b>${comments}</b>
                        </p>
                        <p class="info-item">
                        <b>${downloads}</b>
                        </p>
                    </div>
                </div>
                </a>
            `;
        });
    
    galleryE.insertAdjacentHTML('beforeend', markup);
}

async function handleSubmit(e) {
    e.preventDefault();
    options.params.q = searchInputE.value.trim();

    if (options.params.q === "") return;
    options.params.page = 1;
    galleryE.innerHTML = "";
    reachEnd = false;

    try {
        const res = await axios.get(BASE_URL, options);
        totalHits = res.data.totalHits;

        const { hits } = res.data;

        if (hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        } else {
            Notify.success(`Hooray! We found ${totalHits} images.`);
            renderGallery(hits);
        }
        searchInputE.value = "";
    } catch (e) {
        Notify.failure(e);
    }

}

searchFormE.addEventListener('submit', handleSubmit);