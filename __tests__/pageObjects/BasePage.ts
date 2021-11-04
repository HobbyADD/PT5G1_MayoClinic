import { By, Builder, Capabilities, until, WebDriver, WebElement } from "selenium-webdriver";
const chromedriver = require("chromedriver");

export class BasePage {
    driver: WebDriver;
    url: string;

    constructor(url: string, driver?: WebDriver) {
        
        if(driver == undefined) {
            this.driver = new Builder()
            .withCapabilities(Capabilities.chrome())
            .build();
        }
        else
            this.driver = driver;
            
        this.url = url
    }

    async navigate(url?: string): Promise<void> {
        if (url) return await this.driver.get(url);
        else if (this.url) return await this.driver.get(this.url);
        else
          return Promise.reject(
            "BasePage.navigate() needs a URL defined on the page object, or one passed in. No URL was provided."
          );
    }

    /**
     * waits for the identified element to be located and visible before returning it.
     * @param {By} elementBy - the locator for the element to return.
     */
     async getElement(elementBy: By): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(elementBy));
        let element = await this.driver.findElement(elementBy);
        await this.driver.wait(until.elementIsVisible(element));
        return element;
    }
    /**
     * clicks the given element after waiting for it
     * @param {By} elementBy - the locator for the element to click
     */
    async click(elementBy: By): Promise<void> {
        let element = await this.getElement(elementBy);
        await this.driver.wait(until.elementIsEnabled(element));
        return await element.click();
    }

    /**
     * clears the given element after waiting for it, and then sends the provided keys
     * @param {By} elementBy - the locator for the element to clear and sendKeys to
     * @param {any} keys - the string or list of keys to send
     */
    async setInput(elementBy: By, keys: any): Promise<void> {
        let input = await this.getElement(elementBy);
        await this.driver.wait(until.elementIsEnabled(input));
        await input.clear();
        return input.sendKeys(keys);
    }

    /**
     * returns an element's text after waiting for it to be visible
     * @param {By} elementBy - the locator of the element to get text from
     */
    async getText(elementBy: By): Promise<string> {
        let element = await this.getElement(elementBy);
        await this.driver.wait(until.elementIsEnabled(element));
        return element.getText();
    }
}