interface Props {
    disabled: boolean;
    isLoading: boolean;
    text: string;
    loadingText: string;
}

function FormButton({ disabled, isLoading, text, loadingText }: Props) {

  return (
    <button
      type="submit"
      disabled={disabled}
      className=" border border-black dark:border-white hover:border-transparent dark:hover:border-transparent hover:bg-blue-500 active:bg-blue-600 disabled:bg-gray-500 text-black dark:text-white px-10 py-4 rounded"
    >
      {isLoading ? `${loadingText}...` : `${text}`}
    </button>
  );
}

export default FormButton;
