module.exports = {
    "shoppingCart": [
        {
            "paid": false,
            "quantity": 2,
            "user_id": 7,
            "finish": "Mate",
            "size": "5x5",
            "payment": null,
            "product": 1,
            "price": 700
        },
        {
            "paid": false,
            "quantity": 3,
            "user_id": 7,
            "finish": "Glossy",
            "size": "5x5",
            "payment": null,
            "product": 1,
            "price": 700
        },
        {
            "paid": false,
            "quantity": 1,
            "user_id": 7,
            "finish": "Torna Sol",
            "size": "5x5",
            "payment": null,
            "product": 1,
            "price": 700
        }
    ],
    "amount": "10000",
    "response": {
        "buyOrder": "example",
        "transactionDate": new Date(),
        "cardDetail": {
            "cardNumber": "xxxxxxxx"
        },
        "detailOutput": [
            {
                "responseCode": 1,
                "paymentTypeCode": "1",
                "authorizationCode": "1",
                "commerceCode": "SweetLemonStore"
            }
        ]
    }
}
