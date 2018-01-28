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
    //It's worth noting that here we are expecting an object literal to be passed in as "arguments." I'm doing it this way because it's easier and more maintainable than having to pass in all the arguments in a very specific order. It also makes the code a bit neater and more readable here. This is also how React does it with their "props" arguments.
    
    //Now we can define some methods that we want to apply to all LivingBeings. These do not need to be separated by any commas or semicolons.
    sayHello(){
        //We're also going to use another bit of ES6 niftyness here called a template string. Instead of doing that bullshit of "My name is " + this.name, as we used to have to do (and you would always mess up the spacing and the punctuation, because it was such a mess), we can use tic marks (the key just below escape) to define a template and then put the variables directly inside of the quoted text with a dollar sign and brackets. Sweet.
        console.log(`Hello. My name is ${this.name}`);
             //Also, note for future reference that here we can use 'this' even though we haven't called super(), because this property belongs directly to this object--it's not inherited from anywhere. (This object is the "god-damned pater familias," as George Clooney would say).
    }
    attack(target){
        //now we're going to interact with a different object's properties by passing it in as an argument to this object's method. For the purposes of this example, the target is presumed to also be another object created with the LivingBeing class, so it will have the same properties.

        //First we're going to define how much damage our character does. Note that we use "const" as a default in ES6, unless the property has to change, in which case we use "let." We only use "var" when we absolutely have to (which usually means we've coded things improperly anyway and that we should revisit our life choices).
        const standardDmg = this.attackDmg - target.armor;
        const criticalDmg = standardDmg * 2;

        //Now let's add in an element of luck. This is a game, after all. We'll say that the chance to hit is 10 minus the luck differential of the characters. Then we'll add this to a computerized d10 roll, and if that number is greater than or equal to 10, the character gets a hit. If they get more than 15, they get a critical hit.
        const chanceToHit = 10 - (this.luck - target.luck);
        const attackRoll = chanceToHit + Math.ceil(Math.random() * 10);
        const attackIsSuccessful = attackRoll >= 10;
        const criticalHit = attackRoll >= 15;
        //We will use let here, because we're going to change the value of this variable, depending on whether the attack landed.
        let message = '';

        if (attackIsSuccessful) {
            //We use a ternary operator to set the amount of damange done to the target, depending on whether it was a critical hit.
            const dmgDone = (criticalHit) ? criticalDmg : standardDmg; 
            //minus the damage done from the target's health.
            target.health = target.health - dmgDone * 2;
            message = `${target.name} was hit for ${dmgDone * 2} and now has ${target.health} health left.`;

        } else {
            message = `${this.name} missed.`;
        }

        console.log(message);
    }
}