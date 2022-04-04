import { useState, useEffect } from 'react';
import BlockAPI from '../../../helpers/api/block';
import { toast } from 'react-toastify';
import BlockListTopbar from './topBar';
import BlockList from './blockList';
import { formatAxiosErrorResponse } from '../../../helpers/error';

export default function BlockListContainer() {
  const [blocks, setBlocks] = useState([]);
  const [chainStatus, setChainStatus] = useState({ valid: true, difficulty: 0});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = () => {
    setBlocks([]);
    setIsLoading(true);
    setError(null);
    BlockAPI.getAllBlock()
    .then((result) => {
      if (!result.data.success) {
        throw new Error(result.data.message);
      }

      const data = result.data.data;
      setBlocks(data.blockchain);
      setChainStatus({
        valid: data.valid,
        difficulty: data.difficulty,
      })
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

  const triggerMineBlock = () => {
    BlockAPI.triggerMineNewBlock()
    .then(() => {
      toast.success('Triggered mine successfully');
      loadBlocks();
    })
    .catch((error) => {
      let res = formatAxiosErrorResponse(error);
      toast.error(`Triggerred unsuccessfully - ${res.message}`);
    })
  }

  return (
    <>
      <BlockListTopbar 
        chainStatus={chainStatus} 
        handleRefresh={() => {loadBlocks()}}
        handleTriggerMine={triggerMineBlock}
      />
      <BlockList
        blocks={blocks}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}