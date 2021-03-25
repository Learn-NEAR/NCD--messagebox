import { context, ContractPromiseBatch, logging, PersistentMap, storage, u128 } from 'near-sdk-as'
import { toYocto } from './utils';

/**************************/
/* Types */
/**************************/

@nearBindgen
export class Message {
  constructor(public timestamp: u64, public message: string, public sender: string) {
  }
}

/**************************/
/* Storage AND COLLECTIONNS */
/**************************/

const messages = new PersistentMap<string, Message[]>('m')
const contractOwner = "messages.testnet";
const messageLimit = 20;
export const startFee = 0.001;


/**************************/
/* PUBLIC METHODS */
/**************************/

export function initContract(): void {
  /// Initializes the contract with the given NEAR foundation account ID.
  assert(!storage.hasKey('message_fee'), 'Already initialized')
  storage.set('message_fee', startFee);
}

export function sendMessage(target_account_id: string, message: string): void {
  _isInit();
  assert(context.predecessor != target_account_id, "Not possible to send a message to yourself");
  assert(message.length < 120, "Message too long, only less than 120 character allowed");
  const message_fee = toYocto(storage.getSome<number>("message_fee"));

  assert(context.attachedDeposit >= message_fee, 'Message fee not paid');

  _addMessage(target_account_id, message);
  ContractPromiseBatch.create(target_account_id).transfer(u128.sub(context.attachedDeposit, message_fee));
}

export function retrieveMessages(): Message[] | null {
  _isInit();
  const message_bucket = messages.get(context.predecessor, null);
  return message_bucket;
}

export function deleteAllMessages(): void {
  _isInit();
  messages.set(context.predecessor, []);
}

export function changeFee(message_fee: number): void {
  _isInit();
  assert(context.predecessor == contractOwner, "Only the ContractOwner can change the fee");
  assert(0.1 >= message_fee && message_fee >= 0.0000001, "Message fee should be between 0.1 and 0.0000001");
  storage.set("message_fee", message_fee);
}

export function getCurrentFee(): number {
  return storage.getSome<number>("message_fee");
}


// /**************************/
// /* PRIVATE METHODS */
// /**************************/

function _addMessage(target_account_id: string, message: string): void {
  const message_bucket = messages.get(target_account_id);
  const new_message = new Message(context.blockTimestamp, message, context.predecessor);

  if (message_bucket == null) {
    const messageArray = new Array<Message>();
    messageArray.push(new_message);
    messages.set(target_account_id, messageArray);
  }
  else {
    assert(message_bucket.length <= messageLimit, "The postbox of " + target_account_id + " is full");
    message_bucket.push(new_message);
    messages.set(target_account_id, message_bucket);
  }
}

function _isInit(): void {
  assert(storage.hasKey('message_fee'), 'The contract should be initialized before usage.')
}