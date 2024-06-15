document.addEventListener("DOMContentLoaded", () => {
  const storyContainer = document.getElementById("story-container");
  const addPartButton = document.getElementById("add-part");
  const saveStoryButton = document.getElementById("save-story");

  const fetchStoryPrompt = async () => {
    try {
      const response = await fetch("https://www.boredapi.com/api/activity");
      const data = await response.json();
      return data.activity;
    } catch (error) {
      console.error("Error fetching story prompt:", error);
      return "Once upon a time...";
    }
  };

  const addStoryPart = async () => {
    const storyPart = document.createElement("div");
    storyPart.classList.add(
      "bg-gray-100",
      "p-4",
      "rounded-md",
      "shadow-sm",
      "flex",
      "flex-col",
      "space-y-2"
    );

    const prompt = await fetchStoryPrompt();

    const promptElement = document.createElement("p");
    promptElement.textContent = prompt;
    promptElement.classList.add("text-sm", "text-gray-500");

    const inputElement = document.createElement("textarea");
    inputElement.classList.add(
      "w-full",
      "h-24",
      "p-2",
      "border",
      "rounded-md",
      "focus:outline-none",
      "focus:ring",
      "focus:border-blue-300"
    );

    storyPart.appendChild(promptElement);
    storyPart.appendChild(inputElement);
    storyContainer.appendChild(storyPart);
  };

  const saveStory = () => {
    const storyParts = storyContainer.querySelectorAll("textarea");
    const story = Array.from(storyParts)
      .map((part) => part.value)
      .join("\n\n");
    localStorage.setItem("story", story);
    alert("Story saved!");
  };

  addPartButton.addEventListener("click", addStoryPart);
  saveStoryButton.addEventListener("click", saveStory);

  // Initial story part
  addStoryPart();
});
