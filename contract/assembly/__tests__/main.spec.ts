import { initContract, retrieveMessages, sendMessage, startFee } from '..';
import { storage, VMContext } from "near-sdk-as";

describe("Check Init", () => {
    it("error if contract is not initiliazed", () => {
        expect(() => {
            retrieveMessages()
        }).toThrow("The contract should be initialized before usage.");
    });

    it("check if message_fee is correctly set after contract init", () => {
        VMContext.setPredecessor_account_id("messages.testnet");
        initContract();
        const message_fee = storage.getSome<number>("message_fee");
        expect(message_fee).toBe(startFee);
    });
});

describe("Send Message", () => {
    it("Send and retrieve", () => {
        VMContext.setPredecessor_account_id("messages.testnet");
        initContract();
        sendMessage("t1.testnet", "testmessage");
        VMContext.setPredecessor_account_id("t1.testnet");
        const messages = retrieveMessages();
        if (messages != null) {
            expect(messages[0].message).toBe("testmessage");
        }

    });
});
