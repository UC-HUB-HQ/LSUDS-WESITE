const ErrorContainer = ({ errorMessage, clearErrorMessage }) => {
  return (
    <div className="flex w-[80%] items-center justify-between rounded-lg bg-red-200 px-2 py-2 tab:w-full">
      <p>{errorMessage}</p>
      <i
        onClick={() => clearErrorMessage(null)}
        className="bi bi-x cursor-pointer text-3xl"
      ></i>
    </div>
  );
};

export default ErrorContainer;