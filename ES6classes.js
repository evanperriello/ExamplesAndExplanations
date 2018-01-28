//This is a basic explanation of how ES6 classes work.

//Classes are just a nice syntax for creating objects within javascript. They make the prototype chain clearer through Extends, and they separate the methods of the object from the constructor in a nice, standardized way.

//ignore this little function for right now--this isn't part of the classes, but its reason for being is going to be clear in a moment. Basically, it just returns a random number from 1-10.
function calculateLuck(){
    return Math.ceil(Math.random() * 10);
};

//First, you define a new class with the word "class." Uppercase naming is standard.
class LivingBeing {
    //Then you use a constructor, which is like the old (ES5 or earlier) constructor function you might be familiar with. This uses the arguments passed in at the instantiation/invocation of the object to map specific values to properties. Constructor is nothing more than a special method attached to the object that runs automatically at the start. This also means that constructor is a handy place to put in other functions that we need to be run at the creation of the object. For example, see how we're defining the character's luck attribute by running another function?

    constructor(arguments) {
        this.name = arguments.name;
        this.attackDmg = arguments.attackDmg;
        this.health = arguments.health;
        this.armor = arguments.armor;
        this.luck = calculateLuck();
    }
    //It's worth noting that here we are expecting an object literal to be passed in as "arguments." I'm doing it this way because it's easier and more maintainable than having to pass in all the arguments in a very specific order.
    
    //Now we can define some methods that we want to apply to all LivingBeings. These do not need to be separated by any commas or semicolons.
    sayName(){
        //We're also going to use another bit of ES6 niftyness here called a template string. Instead of doing that bullshit of "My name is " + this.name, as we used to have to do (and you would always mess up the spacing and the punctuation, because it was such a mess), we can use tic marks (the key just below escape) to define a template and then put the variables directly inside of the quoted text with a dollar sign and brackets. Sweet.
        console.log(`My name is ${this.name}`);
             //Also, note for future reference that here we can use 'this' even though we haven't called super, because this property belongs directly to this object--it's not inherited from anywhere. This object is the "god-damned pater familias," as George Clooney would say.
    }
    attack(target){
        //now we're going to interact with a different object's properties by passing it in as an argument to this object's method. For the purposes of this example, the target is presumed to also be another object created with the LivingBeing class, so it will have the same properties.

            //Note that we use "const" as a default in ES6 below, unless the property has to change, in which case we use "let." We only use "var" when we absolutely have to (which usually means we've coded things improperly anyway and that we should revisit our life choices).
        
        const totalDmg = (this.attackDmg - target.armor);

        target.health = target.health - (this.attackDmg - target.armor);
        console.log(`${target.name} was attacked for ${totalDmg} and now has ${}`)
    }
}