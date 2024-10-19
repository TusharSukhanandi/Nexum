import PlaceHolderConversation from "./PlaceHolderConversation";

const LoadingConversation = () => {
    return (
      <div className="w-full h-auto mt-6 text-white">
        <PlaceHolderConversation />
        <PlaceHolderConversation />
        <PlaceHolderConversation />
        <PlaceHolderConversation />
      </div>
    );
  };

  export default LoadingConversation;