import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { fetchAllUsers } from "../controllers/admin-controllers/fetchAllUsers.controller.js";
import { fetchAllCourses } from "../controllers/admin-controllers/fetchAllCourses.controller.js";
import { createCourse } from "../controllers/admin-controllers/createCourse.controller.js";
import { updateCourse } from "../controllers/admin-controllers/updateCourse.controller.js";
import { deleteCourse } from "../controllers/admin-controllers/deleteCourse.controller.js";
import { fetchAllModules } from "../controllers/admin-controllers/fetchAllModules.controller.js";
import { fetchModule } from "../controllers/admin-controllers/fetchModule.controller.js";
import { createModule } from "../controllers/admin-controllers/createModule.controller.js";
import { updateModule } from "../controllers/admin-controllers/updateModule.controller.js";
import { deleteModule } from "../controllers/admin-controllers/deleteModule.controller.js";
import { fetchAllDecks } from "../controllers/admin-controllers/fetchAllDecks.controller.js";
import { createDeck } from "../controllers/admin-controllers/createDeck.controller.js";
import { updateDeck } from "../controllers/admin-controllers/updateDeck.controller.js";
import { removeDeck } from "../controllers/admin-controllers/removeDeck.controller.js";
import { fetchAllFlashcards } from "../controllers/admin-controllers/fetchAllFlashcards.controller.js";
import { fetchFlashcard } from "../controllers/admin-controllers/fetchFlashcard.controller.js";
import { createFlashcard } from "../controllers/admin-controllers/createFlashcard.controller.js";
import { updateFlashcard } from "../controllers/admin-controllers/updateFlashcard.controller.js";
import { deleteFlashcard } from "../controllers/admin-controllers/deleteFlashcard.controller.js";
import { fetchCourse } from "../controllers/admin-controllers/fetchCourse.controller.js";
import { fetchDeck } from "../controllers/admin-controllers/fetchDeck.controller.js";
import { enrollUserInCourse } from "../controllers/admin-controllers/enrollUserInCourse.js";
import { showEnrollmentsOfUser } from "../controllers/admin-controllers/showEnrollmentsOfUser.js";
import { attemptFlashcard } from "../controllers/admin-controllers/attemptFlashcard.controller.js";
import { showattemptedFlashcards } from "../controllers/admin-controllers/showAttemptedFlashcards.controller.js";

const router = Router();

router.route("/get-all-users").get(verifyJWT, fetchAllUsers)
router.route("/get-all-courses").get(verifyJWT, fetchAllCourses)
router.route("/get-course/:id").get(verifyJWT, fetchCourse) // :id is courseID
router.route("/add-course").post(verifyJWT, createCourse)
router.route("/update-course/:id").patch(verifyJWT, updateCourse)
router.route("/delete-course/:id").delete(verifyJWT, deleteCourse)
router.route("/get-all-modules/:id").get(verifyJWT, fetchAllModules) // :id is courseID
router.route("/get-module/:id").get(verifyJWT, fetchModule) // :id is moduleID
router.route("/add-module/:id").post(verifyJWT, createModule) // :id is courseID
router.route("/update-module/:id").patch(verifyJWT, updateModule) // :id is moduleID
router.route("/delete-module/:id").delete(verifyJWT, deleteModule) // :id is moduleID
router.route("/get-all-decks").get(verifyJWT, fetchAllDecks)
router.route("/get-deck/:id").get(verifyJWT, fetchDeck) // :id is deckID
router.route("/add-deck").post(verifyJWT, createDeck)
router.route("/update-deck/:id").patch(verifyJWT, updateDeck)
router.route("/delete-deck/:id").delete(verifyJWT, removeDeck)
router.route("/get-all-flashcards/:id").get(verifyJWT, fetchAllFlashcards) // :id is deckID
router.route("/get-flashcard/:id").get(verifyJWT, fetchFlashcard)
router.route("/add-flashcard/:id").post(verifyJWT, createFlashcard) // :id is deckID
router.route("/update-flashcard/:id").patch(verifyJWT, updateFlashcard) // :id is flashcardID
router.route("/delete-flashcard/:id").delete(verifyJWT, deleteFlashcard) // :id is flashcardID
router.route("/get-user-enrollments/:userID").get(verifyJWT, showEnrollmentsOfUser)
router.route("/enroll-in-course").post(verifyJWT, enrollUserInCourse)
router.route("/attempt-flashcard").post(verifyJWT, attemptFlashcard)
router.route("/show-attempted-flashcards/:userID").get(verifyJWT, showattemptedFlashcards)

export default router;