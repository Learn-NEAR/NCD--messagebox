import { initContract, retrieveMessages, startFee } from '..';
import { storage } from "near-sdk-as";

describe("Check Init", () => {

    it("error if contract is not initiliazed", () => {
        expect(() => {
            retrieveMessages()
        }).toThrow("The contract should be initialized before usage.");
    });

    it("check if message_fee is correctly set after contract init", () => {
        initContract();
        const message_fee = storage.getSome<number>("message_fee");
        expect(message_fee).toBe(startFee);
    });
});

// describe("Init", () => {
//     it("check message_fee", () => {
//         initContract();
//         const message_fee = storage.get<number>("message_fee");
//         expect(message_fee).toBe(startFee);
//     });
// });
