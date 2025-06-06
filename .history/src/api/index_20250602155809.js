import axios from "axios";

export default class Api {
  // IMAGES
  static uploadImage = async (file, query, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(`upload-image${query}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // Upload multiple images
  static uploadImages = async (files, query, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        const filename = file?.name
          ? file.name
          : file.uri.split("/").pop() || "";
        const ext = filename.split(".").pop() || "";

        const newFile = {
          uri: file.uri,
          name: filename.trim(),
          type: `image/${ext}`,
        };

        formData.append("images", newFile);
      });

      const res = await axios.post(`upload-images${query || ""}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // Add Survey
  static addSurvey = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post("survey", data);
      return { data: res.data };
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // AUTH
  static login = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post("auth/login", data);
      return { data: res.data };
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // Get Profile
  static getProfile = async (setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get("auth/get-basic-profile");
      return { data: res.data };
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static register = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post("auth/register", data);
      return { data: res.data };
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getAllWarmUps = async (setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get("warmups");
      return { data: res.data };
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getWarmUpById = async (id, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`warmups/${id}`);
      return { data: res.data };
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getAllDanceEntries = async (setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get("dance-dictionary");
      return { data: res.data.entries };
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getDanceEntryById = async (id, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`dance-dictionary/${id}`);
      return { data: res.data.entry };
    } catch (error) {
      return {
        error: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };
}
