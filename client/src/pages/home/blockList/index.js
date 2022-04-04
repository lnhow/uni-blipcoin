import { useState, useEffect } from 'react';
import BlockAPI from '../../../helpers/api/block';
// import { toast } from 'react-toastify';
import BlockListTopbar from './topBar';
import BlockList from './blockList';

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
        let res = {};
        if (error.response && error.response.data) {
          if (error.response.data) {
            res = {...error.response.data};
          }
          //Incase cannot request to server
          res.data = error.response.data;
          res.status = error.response.status;
        }
        else {
          res.message = error.message;
        }
        setError(res);
      }
    )
    .finally(() => {
      setIsLoading(false);
    })
  }

  // const onTriggerMineSuccess = (data) => {
  //   toast.success(data.message);
  //   loadBlocks();
  // }

  // const onTriggerMineFailed = (err) => {
  //   let message = err.message; //Incase cannot request to server
  //   if (err.response && err.response.data) {
  //     message = err.response.data.message;
  //   }
  //   toast.error(message);
  // }

  return (
    <>
      <BlockListTopbar 
        chainStatus={chainStatus} 
        handleRefresh={() => {loadBlocks()}}
      />
      <BlockList
        blocks={blocks}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}