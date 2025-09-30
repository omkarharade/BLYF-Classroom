// ✅ Special Case Popup Component
const SpecialCasePopup = ({ visible, onClose, title, description }) =>  {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 rounded-xl shadow-lg w-[90%] max-w-md z-50">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white ml-4"
        >
          ❌
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-200">{description}</p>
    </div>
  );
}

export default SpecialCasePopup;
