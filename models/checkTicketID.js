const { getTickets, redeemedTicket } = require('../models/database-functions');


module.exports = {
    async checkTicket(id) {
        const ticketID = id.id
        console.log('this is in the checkTicketID.js:', ticketID);
        console.log('--------------------------------------')
        const data = await getTickets(ticketID)

        let resObj = {
            ID: ticketID,
            Redeemed: false,
            Message: 'This ticket was not found',
            Status: 404
        }
        
        if (data && data.Redeemed !== true) {
            resObj.Message = 'Successfully verified Ticket'
            resObj.Status = 200
            console.log('The ticket has Now been redeem and wont be viable anymore:', data)
            await redeemedTicket(ticketID);
            return await resObj
        }else if (data && data.Redeemed !== false) {
            resObj.Redeemed = true;

            resObj.Status = 202
            resObj.Message = 'This ticket has already been redeemed'
            return await resObj
        }else 
            return await resObj;

        

        

    }   
}
