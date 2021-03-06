
import { HomePage } from "./pageObjects/HomePage";

//this is opening the browser to the home page and going to the home page before an async is executed
//it then loops until there are no more async functions. at that point it closes the browser
describe("Information Page Navigation", () => {
    const page = new HomePage();
    beforeEach(async () => {
      await page.navigate();
    });
    afterAll(async () => {
        await page.driver.quit();
    });
    

//This tests the Patient and visitor guide page opened
test("Verify Patient and Visitor Guide page load - Jira PT5G1-3", async () => {
    
    //this is clicking on the link to the Patient Visitor page
    await page.clickPatientVisitor();

    //setting variable isPatientVisitorPageTrue to the HomePage file element locator
    let isPatientVisitorPageTrue = await page.isPatientGuidePage();
    expect(isPatientVisitorPageTrue).toBe(true);
    
    })

//This tests the Contact Us page opened
test("Verify Contact Us page load - Jira PT5G1-4", async () => {
    
    //this is clicking on the link to the Contact Us page
    await page.clickContactUs();

    //setting variable isContactPageTrue to the HomePage file element locator
    let isContactPageTrue = await page.isContactPage();
    expect(isContactPageTrue).toBe(true);
    
    })

//This tests the COVID 19 page opened
test("Verify COVID-19 vaccine & information page load - Jira PT5G1-5", async () => {

    //this is clicking on the link to the COVID 19 page
    await page.clickCovidInfo();

    //setting variable isCovidPageTrue to the HomePage file element locator
    let isCovidPageTrue = await page.isCovidPage();
    expect(isCovidPageTrue).toBe(true);
    
    })
})