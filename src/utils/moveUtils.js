// Define connection options based on primary position
export const getConnectionOptions = (primaryPosition) => {
  switch (primaryPosition) {
    case "None":
      return ["Basic (N-B)", "Shoulder (N-S)", "Hip (N-H)"];
    case "Open":
      return [
        "Basic (O-B)",
        "Left Hand (O-LH)",
        "Right Hand (O-RH)",
        "Left Handshake (O-LS)",
        "Right Handshake (O-RS)",
        "Left on Left (O-L2L)",
        "Right on Right (O-R2R)",
        "Left on Left Pretzel (O-LP)",
        "Right on Right Pretzel (O-RP)",
        "Left Parallel (O-LPR)",
        "Right Parallel (O-RPR)",
      ];
    case "Closed":
      return ["Basic (C-B)", "Basic Var 2 (C-B2)", "Half (C-H)"];
    case "Hammerlock":
      return [
        "Left Hand (H-LH)",
        "Right Hand (H-RH)",
        "Lead Left Hand (H-LLH)",
        "Lead Right Hand (H-LRH)",
      ];
    case "Shadow":
      return ["Basic (S-B)", "Shoulder (S-S)", "Hip (S-H)"];
    case "Sombrero":
      return ["Basic (SO-B)", "Shoulder (SO-S)", "Hip (SO-H)"];
    case "Titanic":
      return ["Basic (T-B)", "Shoulder (T-S)", "Hip (T-H)"];
    case "Crossbody":
      return ["Basic (CR-B)", "Shoulder (CR-S)", "Hip (CR-H)"];
    case "Basket":
      return ["Basic (B-B)", "Shoulder (B-S)", "Hip (B-H)"];
    default:
      return ["Basic", "Shoulder", "Hip"];
  }
};

// Get the shortcode from connection option
export const getConnectionShortcode = (connectionOption) => {
  const match = connectionOption.match(/\((.*?)\)/); // Looks for text inside ()
  return match ? match[1] : connectionOption;
};

// Position options
export const positionOptions = [
  "None",
  "Open",
  "Closed",
  "Hammerlock",
  "Shadow",
  "Sombrero",
  "Titanic",
  "Crossbody",
  "Basket",
];
