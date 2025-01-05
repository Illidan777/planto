class Plant {
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
                }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.type = type;
        this.careType = careType;
        this.irrigationType = irrigationType;
        this.lightType = lightType;
        this.temperatureRange = temperatureRange;
        this.size = size;
        this.imgUrl = imgUrl;
        this.advantages = advantages;
    }

    getShortDescription() {
        return this.description.short;
    }

    getPreviewDescription() {
        return this.description.preview;
    }

    getFullDescription() {
        return this.description.full;
    }

    getSize() {
        return `Width: ${this.size.width}, Height: ${this.size.height}, Length: ${this.size.length}`;
    }

    getAdvantages() {
        return this.advantages.join(", ");
    }

    getPlantDetails() {
        return {
            name: this.name,
            price: this.price,
            type: this.type,
            careType: this.careType,
            lightType: this.lightType,
            temperatureRange: this.temperatureRange,
        };
    }

    render() {
        const element = document.createElement('div');
        this.classes.forEach(className => element.classList.add(className));

        element.innerHTML = `
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
        this.parent.append(element);
    }
}


