import Image from "next/image";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCost } from "../store/costs-slice";

import { toggle } from "../store/form-modal-slice";

function AddCostForm() {
  const loading = useSelector((state) => state.costs.loading);
  const titleRef = useRef();
  const costAmountRef = useRef();
  const datetimeRef = useRef();

  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(toggle());
  };

  const formContainerClass = `
    bg-light 
    h-fit
    max-h-[90vh] 
    max-w-[90vw] 
    min-w-[50vw] 
    shadow-md 
    z-10 
    rounded-2xl 
    w-[90vw] 
    h-[90vh] 
    md:w-[80vw] 
    lg:w-[70vw]
    flex flex-col
    items-center
    p-8
    
    `;
  const inputClass = ` w-full p-3 rounded-xl my-3`;

  const onAddCost = () => {
    // const id = Math.round(Math.random() * 10000000);
    const title = titleRef.current?.value;
    const costAmount = costAmountRef.current?.value;
    const date = datetimeRef.current?.value;

    if (title && costAmount && date) {
      const cost = Number(costAmount);
      const mycost = { title, costAmount: cost, date };
      dispatch(addCost(mycost));
      titleRef.current.value = "";
      costAmountRef.current.value = "";
      datetimeRef.current.value = "";

      titleRef.current.focus();
    }
  };

  return (
    <div className={formContainerClass}>
      <h1 className="text-2xl font-bold mb-4 text-primary">Cost Details</h1>

      <input
        ref={titleRef}
        className={inputClass}
        type="text"
        placeholder="Title"
      />

      <input
        ref={costAmountRef}
        className={inputClass}
        type="number"
        placeholder="Cost Amount $"
        min={0}
      />

      <input ref={datetimeRef} className={inputClass} type="date" />

      <div className="flex gap-3 my-3">
        <button
          disabled={loading}
          onClick={onAddCost}
          className="bg-primary p-4 rounded-xl text-tertiary"
        >
          {loading && (
            <Image
              className="animate-spin"
              alt="loading spinner"
              src="/loading.svg"
              width="20"
              height={20}
            />
          )}
          {!loading && <span>Add Cost</span>}
        </button>
        <button
          disabled={loading}
          onClick={toggleModal}
          className="bg-red-500 p-4 rounded-xl text-tertiary"
        >
          {loading && (
            <Image
              className="animate-spin"
              alt="loading spinner"
              src="/loading.svg"
              width="20"
              height={20}
            />
          )}
          {!loading && <span>Cancel</span>}
        </button>
      </div>
    </div>
  );
}

export default AddCostForm;
