import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material'
import BlockAPI from '../../../helpers/api/block';
import TopBar from './topBar';
import BlockDetails from './blockDetails';
import TransactionList from '../../../components/transactionsList/transactionList';

import { formatAxiosErrorResponse } from '../../../helpers/error';
import { INITIAL_BLOCK_STATE } from './helper';

export default function BlockDetailsContainer({
  blockIndex = 0,
}) {
  const [block, setBlock] = useState(INITIAL_BLOCK_STATE);
  const [index, setIndex] = useState(blockIndex);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlock(blockIndex);
  }, [blockIndex]);

  const loadBlock = (blockIndex) => {
    setBlock(INITIAL_BLOCK_STATE);
    setIsLoading(true);
    setError(null);
    BlockAPI.getBlockByIndex(blockIndex)
    .then((result) => {
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      console.log(result)
      const data = result.data.data;
      setBlock(data.block);
      setIndex(data.index);
    })
    .catch(
      (error) => {
        let res = formatAxiosErrorResponse(error);
        setError(res);
      }
    )
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <>
      <TopBar 
        handleRefresh={() => {loadBlock(blockIndex)}}
      />
      <BlockDetails
        index={index}
        block={block}
        isLoading={isLoading}
        error={error}
      />
      <Box marginTop={2} marginBottom={1}>
        <Typography variant='h6'>
          <b>Transactions in block</b>
        </Typography>
      </Box>
      <TransactionList
        transactions={block.transactions}
      />
    </>
  )
}