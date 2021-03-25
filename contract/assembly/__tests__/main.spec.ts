import { initContract, retrieveMessages, startFee } from '..';
import { storage } from "near-sdk-as";

describe("Init", () => {

    it("call method before init", () => {
       expect(retrieveMessages()).toThrow("The contract should be initialized before usage.");
    });

    it("check message_fee correctly set", () => {
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
