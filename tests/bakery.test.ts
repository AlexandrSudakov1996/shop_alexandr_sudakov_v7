import {app} from "../src/configurations/firebase-config";
import {deleteApp} from 'firebase/app';
import {addCategory, isCategoryExists, removeCategory} from "../src/firebase/firebaseDBService.ts";


describe('BakeryShop Тесты', () => {


    const testsCategories = ['test-add', 'test-delete'];


    const cleanCategories = async () => {
        for (const category of testsCategories) {
            try {
                await removeCategory(category);
            } catch (e) {
                console.log(e)
            }
        }
    };

    beforeAll(async () => {
        for (const category of testsCategories.slice(0, 1)) {
            await addCategory({categoryName: category});
        }
    });

    afterAll(async () => {
        await cleanCategories();
        await deleteApp(app);
    });

    test('Test: firebaseDbService.isCategoryExists', async () => {

        expect(isCategoryExists('bread')).resolves.toBeTruthy();
        expect(isCategoryExists('milk')).resolves.toBeFalsy();
    });


    test('Test: allCategory', async () => {

        const categories = ['bread'];

        const Promises = categories.map(name => isCategoryExists(name));

        const results = await Promise.all(Promises);

        const allExist = results.every(exists => exists);

        expect(allExist).toBeTruthy();
    });


    test('Test:removeCategory', async () => {
        const categoryName = 'test-delete';


        await addCategory({categoryName});


        await removeCategory(categoryName);


        const exists = await isCategoryExists(categoryName);
        expect(exists).toBeFalsy();
    });


    test('Test: addCategory', async () => {
        const categoryName = 'test-add';

        await addCategory({categoryName});


        const exists = await isCategoryExists(categoryName);
        expect(exists).toBeTruthy();
    });
});
