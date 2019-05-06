import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: '***',
  authDomain: 'pretty-yummy-recipes.firebaseapp.com',
  databaseURL: 'https://pretty-yummy-recipes.firebaseio.com',
  projectId: 'pretty-yummy-recipes',
  storageBucket: 'pretty-yummy-recipes.appspot.com',
  messagingSenderId: '***'
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  // Authentication API
  doSignUp = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  // Users Firestore API
  user = id => this.db.doc(`users/${id}`)

  users = () => this.db.collection('users')

  // Merge Auth and DB user API
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snap => {
            const dbUser = snap.data()
            authUser = {
              id: authUser.uid,
              ...dbUser
            }
            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // Recipes API
  recipe = id => this.db.doc(`recipes/${id}`)

  recipes = () => this.db.collection('recipes')

  fetchRecipeListAfterItem = async (lastVisible, limit) =>
    await this.recipes()
      .orderBy('title')
      .startAfter(lastVisible)
      .limit(limit)
      .get()

  fetchRecipeListAtItem = async (prevItem, limit) =>
    await this.recipes()
      .orderBy('title')
      .startAt(prevItem)
      .limit(limit)
      .get()

  fetchTenBestRecipes = async () =>
    await this.recipes()
      .orderBy('rating', 'desc')
      .limit(10)
      .get()

  // Rating API
  rating = id => this.db.doc(`rating/${id}`)

  ratings = () => this.db.collection('rating')

  getRatingByRecipeId = async recipeId =>
    await this.ratings()
      .where('recipeId', '==', recipeId)
      .get()

  getRatingByUserIdAndRecipeId = async (userId, recipeId) =>
    await this.ratings()
      .where('userId', '==', userId)
      .where('recipeId', '==', recipeId)
      .get()

  updateRatingById = async (ratingId, value) =>
    await this.ratings()
      .doc(ratingId)
      .update({ value })

  updateRatingByRecipeId = (recipeId, rating) =>
    this.recipes()
      .doc(recipeId)
      .update({ rating })

  // Bookmarks API
  bookmark = id => this.db.doc(`bookmarks/${id}`)

  bookmarks = () => this.db.collection('bookmarks')

  addToBookmarks = async (userId, recipeId, title) =>
    await this.bookmarks().add({ userId, recipeId, title })

  deleteFromBookmarks = async id =>
    await this.bookmarks()
      .doc(id)
      .delete()

  getBookmarkByUserAndRecipe = async (userId, recipeId) =>
    await this.bookmarks()
      .where('userId', '==', userId)
      .where('recipeId', '==', recipeId)
      .get()
}

export default Firebase
