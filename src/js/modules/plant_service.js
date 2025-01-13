import plants from "./const/plants";
import {PLANT_TYPES, PLANT_CARE_TYPES, PLANT_LIGHT_TYPES, PLANT_IRRIGATION_TYPES} from "./const/enums"

class PlantBaseInfo {
    constructor(id, name, price, imgUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}

class Plant extends PlantBaseInfo{
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
        this.rubrics = rubrics
    }

    getType() {
        return PLANT_TYPES.get(this.type) ? PLANT_TYPES.get(this.type) : 'Unknown plant type'
    }

    getCareType() {
        return PLANT_CARE_TYPES.get(this.careType) ? PLANT_CARE_TYPES.get(this.careType) : 'Unknown care type'
    }

    getLightType() {
        return PLANT_LIGHT_TYPES.get(this.lightType) ? PLANT_LIGHT_TYPES.get(this.lightType) : 'Unknown light type'
    }

    getIrrigationType() {
        return PLANT_IRRIGATION_TYPES.get(this.irrigationType) ? PLANT_IRRIGATION_TYPES.get(this.irrigationType) : 'Unknown irrigation type'
    }

    getSize() {
        return `${this.size.width} x ${this.size.height} x ${this.size.length}`;
    }

    getAdvantages() {
        return this.advantages.join(", ");
    }
}

function loadPlantById(id) {
    const plant = loadAllPlants().find(plant => plant.id === +id)
    if (!plant) {
        console.error(`Plant by id ${id} not found`);
    }
    return plant
}

function loadAllPlants() {
    return plants.map(plant => new Plant(plant));
}

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
                                <button class="squareButton"><img src="../icons/bag.png" alt="buy"></button>
                            </div>
                 
                        </div>
                    </div>
        `

    container.appendChild(plantItem)
}

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
                                    <span>Size</span>
                                    <span>${plant.getSize()}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span>Temperature Range</span>
                                    <span>${plant.temperatureRange}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span>Type</span>
                                    <span>${plant.getType()}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span>Care type</span>
                                    <span>${plant.getCareType()}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span>Irrigation type</span>
                                    <span>${plant.getIrrigationType()}</span>
                                </li>
                                <li class="plantCard__characteristics_item">
                                    <span>Light type</span>
                                    <span>${plant.getLightType()}</span>
                                </li>
                            </ul>
                            <div class="plantCard__description">
                                ${plant.description.full}
                                <span class="text__simple__size_small text__weight_medium"> Advantages: ${plant.getAdvantages()}.</span>
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
                            <button>Buy now</button>
                        </div>
        `

    container.prepend(plantSliderItem);
}

function renderTrendyPlant(plant, container, plantFullInfoModalId, reversedOrientation) {
    const trendyPlant = document.createElement('div')

    const trendyPlantClassList = ['bigPlantItem', 'defaultItemBlock']
    if(reversedOrientation) {
        trendyPlantClassList.push('reversed')
    }
    console.log(trendyPlantClassList)

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
                                <button class="squareButton"><img src="../icons/bag.png" alt="bag"></button>
                            </div>
                        </div>
        `

    container.appendChild(trendyPlant);
}

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

function renderPlants() {

    const appContainer = document.querySelector('.app'),
        promoSliderContainer = appContainer.querySelector('.promo__plant-slider'),
        trendyRubricContainer = appContainer.querySelector('.promo__trendyPlants_itemWrapper'),
        topSellingRubricContainer = appContainer.querySelector('.topSelling__topPlants'),
        bestO2RubricContainer = appContainer.querySelector('.bestO2-slider');

    loadAllPlants().forEach((plant, index) => {

        const plantFullInfoModalId = `plantModal_${plant.id}`

        renderPlantInfoModal(plant, appContainer, plantFullInfoModalId);

        if(plant.rubrics.includes('PROMO_SLIDER')) {
            renderPromoPlantSliderItem(plant, promoSliderContainer)
        }

        if(plant.rubrics.includes('TRENDY')) {
            const reversedOrientation = (index + 1) % 2 === 0
            renderTrendyPlant(plant, trendyRubricContainer, plantFullInfoModalId, reversedOrientation)
        }

        if (plant.rubrics.includes('TOP_SELLING')) {
            renderPlantCard(plant, topSellingRubricContainer, plantFullInfoModalId);
        }

        if(plant.rubrics.includes('BEST_O2')) {
            renderBestO2Plant(plant, bestO2RubricContainer, plantFullInfoModalId)
        }
    })
}

export { loadPlantById, PlantBaseInfo}
export default renderPlants;


