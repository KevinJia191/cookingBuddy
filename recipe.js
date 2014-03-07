//TODO: Figure out difference between using this.username, self.username, and var username
function Recipe(username, recipename, datecreated, rating){
    //each "Recipe" object represents a row in the History table
    this.userName = username;
    this.recipeName = recipeName;
    this.dateCreated = dateCreated;
    this.rating = rating;
    
    //repeat for all fields
    this.getUsername = function(){
        return this.userName;
    }
    
}