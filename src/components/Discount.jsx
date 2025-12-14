import React from 'react'

const Discount = ({ data, index }) => {
  return (
    <>
      <div
        key={index}
        className="h-[80px] w-[350px] rounded-3xl border-[1px] border-[rgba(2,6,12,0.15)] p-2.5"
      >
        <div className="h-full w-full flex items-center">
          <div className="ml-3">
            <img
              className="h-[50px] w-[50px]"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${data?.info?.offerLogo}`}
              alt=""
            />
          </div>

          <div className="flex justify-center ml-3 flex-col">
            <p className="text-[18px] font-extrabold text-[#122620]">
              {data?.info?.header}
            </p>
            <p className="text-[rgba(2,6,12,0.45)] font-extrabold">
              {data?.info?.primaryDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Discount
