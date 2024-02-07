addLayer("s", {
    name: "superpoints", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    name: "superpoints",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "superpoints", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('s', 13)) mult = mult.times(upgradeEffect('s', 13))
        if (hasUpgrade('s', 21)) mult = mult.times(5)
        return mult
    },
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for superpoints", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    
    upgrades: {
        11: {
            title: "Upgraded Points",
            description: "Point gain is 1.5",
            cost: new Decimal(1),
        },
        12: {
            title: "More Points",
            description: "Point gain is multiplied by your superpoints",
            cost: new Decimal(2), 
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Crazy Points",
            description: "Superpoints is boosted by your points.",
            cost: new Decimal(5), 
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
        },
        14: {
            title: "Better Points",
            description: "Point gain is multiplied by 2",
            cost: new Decimal(15),
        },
        15: {
            title: "Continue",
            description: "Point gain is multiplied by 5",
            cost: new Decimal(200),
        },      
        21: {
            title: "5 Each",
            description: "Point gain and Super Point Gain is multiplied by 5",
            cost: new Decimal(300),
            
        },

        
    },
    achievements: {
        11: {
            name: "Super Point Power",
            more: "This will just multiply Point gain by 1.5"
        },
        etc
    }
})
