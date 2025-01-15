import plants from "./const/plants";
import { PLANT_TYPES, PLANT_CARE_TYPES, PLANT_LIGHT_TYPES, PLANT_IRRIGATION_TYPES } from "./const/enums";

// Base class representing basic information about a plant
class PlantBaseInfo {
    constructor(id, name, price, imgUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}

// Extended class representing a detailed plant with additional attributes
class Plant extends PlantBaseInfo {
    constructor({
                    id,
                    name,
                    description,
                    price,
                    type,
                    careType,
                    irrigationType,
                    lightType,
                    temperatureRange,
                    size,
                    imgUrl,
                    advantages,
                    rubrics
                }) {
        super(id, name, price, imgUrl);

        this.description = description;
        this.type = type;
        this.careType = careType;
        this.irrigationType = irrigationType;
        this.lightType = lightType;
        this.temperatureRange = temperatureRange;
        this.size = size;
        this.advantages = advantages;
        this.rubrics = rubrics; // Array of categories represents in which section of website the plant has to be included
    }

    // Retrieves the human-readable type of the plant from the enumeration
    getType() {
        return PLANT_TYPES.get(this.type) ? PLANT_TYPES.get(this.type) : 'Unknown plant type';
    }

    // Retrieves the human-readable care type of the plant from the enumeration
    getCareType() {
        return PLANT_CARE_TYPES.get(this.careType) ? PLANT_CARE_TYPES.get(this.careType) : 'Unknown care type';
    }

    // Retrieves the human-readable light type of the plant from the enumeration
    getLightType() {
        return PLANT_LIGHT_TYPES.get(this.lightType) ? PLANT_LIGHT_TYPES.get(this.lightType) : 'Unknown light type';
    }

    // Retrieves the human-readable irrigation type of the plant from the enumeration
    getIrrigationType() {
        return PLANT_IRRIGATION_TYPES.get(this.irrigationType) ? PLANT_IRRIGATION_TYPES.get(this.irrigationType) : 'Unknown irrigation type';
    }

    // Formats the plant's dimensions into a readable string
    getSize() {
        return `${this.size.width} x ${this.size.height} x ${this.size.length}`;
    }

    // Joins the list of advantages into a comma-separated string
    getAdvantages() {
        return this.advantages.join(", ");
    }
}

// Function to load a plant by its unique ID
function loadPlantById(id) {
    if (!id) {
        console.error('Plant id is empty!');
        return;
    }
    const plant = loadAllPlants().find(plant => plant.id === +id);

    if (!plant) {
        console.error(`Plant by id ${id} not found`);
    }

    return plant;
}

// Function to load all plants and create Plant objects
function loadAllPlants() {
    return plants.map(plant => new Plant(plant));
}

// Render specified plant in specified container (Plant shop card)
function renderPlantCard(plant, container, plantFullInfoModalId) {
    const plantItem = document.createElement('div');

    plantItem.classList.add('topSelling__item', 'simplePlantItem', 'defaultItemBlock')

    plantItem.innerHTML = `
                   <div class="simplePlantItem__image">
                        <img src="${plant.imgUrl}" alt="plant${plant.id}">
                    </div>
                    <div class="topSelling__item_info simplePlantItem__infoBlock">
                        <h3 class="text__title__size_medium text__weight_light">${plant.name}</h3>
                        <span class="text__simple__size_medium text__weight_light">${plant.description.preview}</span>
                        <div class="topSelling__item_purchase">
                            <span class="text__simple__size_big text__weight_regular">Rs. ${plant.price}/-</span>
                            <div class="topSelling__item_purchase__btns"> 
                                <button data-modal=${plantFullInfoModalId} class="squareButton"><img src="../icons/info.png" alt="info"></button>
                                <button data-buy=${plant.id} class="squareButton"><img src="../icons/bag.png" alt="buy"></button>
                            </div>
                 
                        </div>
                    </div>
        `

    container.appendChild(plantItem)
}

// Render specified plant in specified container (Plant detailed info modal content)
function renderPlantInfoModal(plant, container, plantFullInfoModalId) {
    const plantItemInfoModal = document.createElement('div')

    plantItemInfoModal.classList.add('modal', plantFullInfoModalId)

    plantItemInfoModal.innerHTML = `
            <div class="modal__dialog">
                <div class="modal__header">
                    <h2 class="text__title__size_medium text__weight_regular">${plant.name}</h2>
                    <div data-modal-close class="modal__closeButton">
                        <img src="../icons/close_icon.png" alt="close">
                    </div>
                </div>
                <div class="modal__content">
                    <div class="plantCard">
                        <div class="plantCard__image">
                            <img src="${plant.imgUrl}" alt="plant${plant.id}">
                        </div>
                        <div class="plantCard__price text__simple__size_big text__weight_medium">
                            Rs. ${plant.price}/
                        </div>
                        <div class="plantCard__info text__simple__size_small text__weight_thin">
                            <ul class="plantCard__characteristics">
                                <li class="plantCard__characteristics_item">
                                    <span class="text__weight_super_bold">Size</span>
                                    <span>${plant.getSize()}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span class="text__weight_super_bold">Temperature Range</span>
                                    <span>${plant.temperatureRange}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span class="text__weight_super_bold">Type</span>
                                    <span>${plant.getType()}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span class="text__weight_super_bold">Care type</span>
                                    <span>${plant.getCareType()}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span class="text__weight_super_bold">Irrigation type</span>
                                    <span>${plant.getIrrigationType()}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span class="text__weight_super_bold">Light type</span>
                                    <span>${plant.getLightType()}</span>
                                </li>
                            </ul>
                            <div class="plantCard__description">
                                ${plant.description.full}
                                <span class="text__simple__size_small text__weight_super_bold"> Advantages: ${plant.getAdvantages()}.</span>
                            </div>
                        </div>
                        <button data-buy=${plant.id}>Buy now</button>
                    </div>
                </div>
                <div class="modal__footer">
                    <img src="../img/plants/modal_plant.png" alt="plant">
                    <img src="../img/plants/modal_plant.png" alt="plant">
                </div>
            </div>
        `

    container.appendChild(plantItemInfoModal)
}

// Render specified plant in specified container (Plant slider item in Promo section)
function renderPromoPlantSliderItem(plant, container) {
    const plantSliderItem = document.createElement('div')

    plantSliderItem.classList.add('promo__plant-slider-item', 'slider__item', 'simplePlantItem')
    plantSliderItem.innerHTML = `
                        <div class="simplePlantItem__image">
                           <img src="${plant.imgUrl}" alt="plant${plant.id}">
                        </div>
                        <div class="simplePlantItem__infoBlock">
                            <span class="text__simple__size_medium text__weight_light">${plant.description.title1}t</span>
                            <div class="text__title__size_medium text__weight_regular">
                                ${plant.name}
                            </div>
                            <button data-buy=${plant.id}>Buy now</button>
                        </div>
        `

    container.prepend(plantSliderItem);
}

// Render specified plant in specified container (Plant item in Trendy section)
function renderTrendyPlant(plant, container, plantFullInfoModalId, reversedOrientation) {
    const trendyPlant = document.createElement('div')

    const trendyPlantClassList = ['bigPlantItem', 'defaultItemBlock']
    if(reversedOrientation) {
        trendyPlantClassList.push('reversed')
    }

    trendyPlant.classList.add(...trendyPlantClassList)
    trendyPlant.innerHTML = `
                        <div class="bigPlantItem__image">
                            <img src="${plant.imgUrl}" alt="plant${plant.id}">
                        </div>
                        <div class="bigPlantItem__infoBlock">
                            <h3 class="text__title__size_medium text__weight_regular">${plant.description.title2}</h3>
                            <p class="text__simple__size_medium text__weight_light">${plant.description.preview}</p>
                            <h3 class="text__title__size_medium text__weight_regular">Rs. ${plant.price}/-</h3>
                            <div class="bigPlantItem__buttons">
                                <button data-modal=${plantFullInfoModalId}>Explore</button>
                                <button data-buy=${plant.id} class="squareButton"><img src="../icons/bag.png" alt="bag"></button>
                            </div>
                        </div>
        `

    container.appendChild(trendyPlant);
}

// Render specified plant in specified container (Plant slider item in Best O2 section)
function renderBestO2Plant(plant, container, plantFullInfoModalId) {
    const bestO2Plant = document.createElement('div')

    bestO2Plant.classList.add('slider__item', 'bigPlantItem', 'defaultItemBlock')
    bestO2Plant.innerHTML = `
                        <div class="bigPlantItem__image">
                           <img src="${plant.imgUrl}" alt="plant${plant.id}">
                        </div>
                        <div class="bigPlantItem__infoBlock">
                            <h3 class="text__title__size_medium text__weight_regular">${plant.description.title3}</h3>
                            <p class="text__simple__size_medium text__weight_light">${plant.description.preview}</p>
                            <div class="bigPlantItem__buttons">
                                <button data-modal=${plantFullInfoModalId} class="button">Explore</button>
                            </div>
                        </div>
        `

    container.prepend(bestO2Plant);
}

// Function to render plants on the page
function renderPlants() {
    // Select the containers where different plant rubrics will be rendered
    const appContainer = document.querySelector('.app'),
        promoSliderContainer = appContainer.querySelector('.promo__plant-slider').querySelector('.slider__wrapper'),
        trendyRubricContainer = appContainer.querySelector('.promo__trendyPlants_itemWrapper'),
        topSellingRubricContainer = appContainer.querySelector('.topSelling__topPlants'),
        bestO2RubricContainer = appContainer.querySelector('.bestO2-slider').querySelector('.slider__wrapper');

    // Loop through all the plants and render them based on their rubric(category)
    loadAllPlants().forEach((plant, index) => {

        // Generate a unique ID for each plant's modal
        const plantFullInfoModalId = `plantModal_${plant.id}`;

        // Render modal with full plant information
        renderPlantInfoModal(plant, appContainer, plantFullInfoModalId);

        // Check if the plant should be displayed in the promo slider
        if (plant.rubrics.includes('PROMO_SLIDER')) {
            renderPromoPlantSliderItem(plant, promoSliderContainer);
        }

        // Check if the plant should be displayed in the trendy rubric
        if (plant.rubrics.includes('TRENDY')) {
            const reversedOrientation = (index + 1) % 2 === 0; // Alternate orientation based on the index
            renderTrendyPlant(plant, trendyRubricContainer, plantFullInfoModalId, reversedOrientation);
        }

        // Check if the plant should be displayed in the top-selling rubric
        if (plant.rubrics.includes('TOP_SELLING')) {
            renderPlantCard(plant, topSellingRubricContainer, plantFullInfoModalId);
        }

        // Check if the plant should be displayed in the best O2 rubric
        if (plant.rubrics.includes('BEST_O2')) {
            renderBestO2Plant(plant, bestO2RubricContainer, plantFullInfoModalId);
        }
    });
}

// Export the necessary functions and objects for use in other modules
export { loadPlantById, PlantBaseInfo };
export default renderPlants;

