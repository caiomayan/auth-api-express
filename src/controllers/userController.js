import axios from "axios";
import crypto from "crypto";
import * as z from "zod";
import * as userService from "../services/userService.js";
import * as userValidator from "../validators/userValidator.js";

export async function listUserID(req, res) {
  try {
    const { id } = userValidator.idValidate.parse(req.params);

    if (id !== req.user.id) {
      return res.status(403).json({
        message:
          "You are not authorized to view other users information. You can only view your own information.",
      });
    }

    const listedUser = await userService.getUserID(id);

    if (!listedUser) {
      return res.status(404).json({
        message: `The user with this UUID does not exist`,
      });
    }

    return res.status(200).json(listedUser);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        message: e.issues[0]?.message || "Validation error",
      });
    }

    console.error(e);
    return res.status(500).json({
      message: "Error occurred while listing the desired user",
    });
  }
}

export async function listUserUsername(req, res) {
  try {
    const { username } = userValidator.usernameValidate.parse(req.params);
    const listedUser = await userService.getUserUsername(username);

    if (!listedUser) {
      return res.status(404).json({
        message: `The user ${username} does not exist`,
      });
    }

    return res.status(200).json(listedUser);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        message: e.issues[0]?.message || "Validation error",
      });
    }

    console.error(e);
    return res.status(500).json({
      message: "Error occurred while listing the desired user",
    });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Error occurred while fetching the list of users",
    });
  }
}

export async function createUser(req, res) {
  try {
    const newUserValidated = userValidator.createUserValidate.parse(req.body);

    if (newUserValidated.password) {
      const sha1Hash = crypto
        .createHash("sha1")
        .update(newUserValidated.password)
        .digest("hex")
        .toUpperCase();

      const leakPassword = await axios.get(
        `https://api.pwnedpasswords.com/range/${sha1Hash.slice(0, 5)}`,
      );

      const leakPasswordResult = leakPassword.data
        .split("\n")
        .some((hash) => hash.startsWith(`${sha1Hash.slice(5)}`));

      if (leakPasswordResult) {
        return res.status(400).json({
          message:
            "The desired password is not secure enough, as there are indications of breaches on the internet",
        });
      }
    }

    const newUser = await userService.addUser(newUserValidated);

    res.status(201).json(newUser);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        error_validator: e.issues.map((issue) => ({
          field: issue.path.join(".") || "body",
          message: issue.message,
        })),
      });
    }

    if (e.code === "23505") {
      return res.status(400).json({
        message: "Username or email is already in use",
      });
    }
    console.error(e);
    res.status(500).json({
      message: "Error occurred while creating the user",
    });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = userValidator.idValidate.parse(req.params);

    const updatedUserValidated = userValidator.updateUserValidate.parse(
      req.body,
    );

    if (id !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update other users.",
      });
    }

    if (updatedUserValidated.password) {
      const sha1Hash = crypto
        .createHash("sha1")
        .update(updatedUserValidated.password)
        .digest("hex")
        .toUpperCase();

      const leakPassword = await axios.get(
        `https://api.pwnedpasswords.com/range/${sha1Hash.slice(0, 5)}`,
      );

      const leakPasswordResult = leakPassword.data
        .split("\n")
        .some((hash) => hash.startsWith(`${sha1Hash.slice(5)}`));

      if (leakPasswordResult) {
        return res.status(400).json({
          message:
            "The desired password is not secure enough, as there are indications of breaches on the internet",
        });
      }
    }

    const updatedUser = await userService.updateUser(id, updatedUserValidated);

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found or nothing to update",
      });
    }

    res.status(200).json(updatedUser);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        error_validator: e.issues.map((issue) => ({
          field: issue.path.join(".") || "body",
          message: issue.message,
        })),
      });
    }

    console.error(e);
    res.status(500).json({
      message: "Error occurred while updating the user",
    });
  }
}

export async function deleteUser(req, res) {
  console.log("Who's trying to delete: ", req.user.username);

  try {
    const { id } = userValidator.idValidate.parse(req.params);

    if (req.params.id !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete other users.",
      });
    }

    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "The user to be deleted does not exist",
      });
    }

    return res.status(200).json({
      message: `User ${deletedUser.username} has been deleted successfully`,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        error_validator: e.issues.map((issue) => ({
          field: issue.path.join(".") || "body",
          message: issue.message,
        })),
      });
    }

    console.error(e);
    return res.status(500).json({
      message: "Error occurred while deleting the user",
    });
  }
}
