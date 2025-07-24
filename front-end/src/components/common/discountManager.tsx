import { useState } from "react";
import { useUserStore } from "../../store";
import callManager from "../../hooks/callManager";
import { discountObj } from "../../types/objects/discountObj";

interface DiscountManagerProps {
  setDiscount: React.Dispatch<React.SetStateAction<discountObj>>;
}

const DiscountManager = ({ setDiscount }: DiscountManagerProps) => {
  const [discountObj, setDiscountObj] = useState<discountObj>({
    offer: "",
    startedAt: "",
    expiredAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDiscountObj({ ...discountObj, [e.target.name]: e.target.value });
  };

  const handleSaveDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDiscount({ ...discountObj });
    setDiscountObj({
      offer: "",
      startedAt: "",
      expiredAt: "",
    });
  };

  return (
    <div>
      <h1>اعمال تخفیف</h1>
      <div className="flex-column bg-green-500">
        <input
          type="text"
          placeholder="قیمت در تخفیف"
          name="offer"
          value={discountObj.offer}
          className="border"
          onChange={handleChange}
          autoComplete="off"
        />
        <br />
        <button
          onClick={handleSaveDiscount}
          disabled={discountObj.offer ? false : true}
        >
          اعمال تخفیف
        </button>
      </div>
    </div>
  );
};
export default DiscountManager;
