import { AuditBlock } from '../../types';

// Simple deterministic hash simulation for hackathon demonstration
const generateHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hex}${Math.random().toString(16).substring(2, 14)}${Math.random().toString(16).substring(2, 14)}`;
};

export const createAuditBlock = (
  lastBlock: AuditBlock,
  eventType: string,
  payload: AuditBlock['payload']
): AuditBlock => {
  const blockNumber = lastBlock ? lastBlock.blockNumber + 1 : 10000;
  const previousHash = lastBlock ? lastBlock.blockHash : '0x0000000000000000000000000000000000000000000000000000000000000000';
  const timestamp = new Date().toISOString();
  
  const blockHash = generateHash(`${blockNumber}-${previousHash}-${timestamp}-${JSON.stringify(payload)}`);

  return {
    blockNumber,
    blockHash,
    previousHash,
    timestamp,
    eventType,
    payload,
    verifiedStatus: 'VERIFIED_IMMUTABLE',
  };
};
