 import moment from "moment"
 
 export const generateTimeSlots = (startHour, endHour,date) => { 
        const slots = []
        const open=parseInt(startHour)
        const close=parseInt(endHour)
        let openHour=Math.ceil(open)
        let closeHour=Math.ceil(close)
        let now=moment()
        let today=moment().format('YYYY-MM-DD')
     
        if(date===today){
            const currenthour=now.hour()
            if(currenthour>=openHour){
                openHour=currenthour+1
            }
        }
    
        
        for (let hour = openHour; hour < closeHour; hour++) {
          const isPM =hour>12
            slots.push(`${hour}:00 ${isPM?'PM':'AM'}`)
        }
        return slots
    }
   
     export const getAvailableSlots = (slots, bookings) => {
           return slots.filter((slot) => {          
         const slotHour = parseInt(slot);
         
         
             const isBooked = bookings.some(
               (booking) =>
                 slotHour >= booking.startTime &&
                 slotHour < booking.endTime
             );
        
             return !isBooked;
           });
         };
         