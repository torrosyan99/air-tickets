import {createSlice} from "@reduxjs/toolkit";
import {getSeats} from "../thunks/getSeats.js";


const ticketSlice = createSlice({
  name: "TICKET",
  initialState: {
    departure: {
      seats: [],
      price: 0,
      activeSeats: [],
      priceForSeats: 0,
      services: {}
    }, arrival: {}
  },
  reducers: {

    updateSeats: (state, action) => {
      const direction = action.payload.direction || 'departure';
      const wagon = state[direction].seats.find(({coach}) => coach.name == action.payload.name);
      const seat = wagon.seats.find(({index}) => index == action.payload.index);
      if (seat.isActive) {
        state[direction].price -= action.payload.price;
        state[direction].priceForSeats -= action.payload.price
        state[direction].activeSeats = state[direction].activeSeats.filter(
          ({coach_id, seat_number}) =>
            !(coach_id === action.payload.coachId &&
              seat_number === action.payload.index)
        );
      } else {
        state[direction].price += action.payload.price;
        state[direction].priceForSeats += action.payload.price
        state[direction].activeSeats.push({

          'coach_id': wagon.coach._id,
          direction:direction,
          "person_info": {
            'first_name': '',
            'last_name': '',
            'patronymic':'',
            birthday: '',
            gender: true,
            document_type:'паспорт',
            document_data : '',
            is_adult: action.payload.type === 'adult'
          },
          is_child: action.payload.type === 'child',
          seat_number: action.payload.index
        })
      }
      seat.isActive = !seat.isActive;
    },

    addSeat: (state) => {
      const departureSeats = state.departure.activeSeats;
      const price = departureSeats.length
        ? state.departure.priceForSeats / departureSeats.length
        : 0;


      let activePlace = null;

      for(let i = 0; i < state.departure.seats.length; i++)  {
        const w = state.departure.seats[i];
        const index = w.seats.findIndex(s =>s.available && !s.isActive )
        if(index != '-1') {
          activePlace= w.seats[index].index;
          break;
        }
      }

      if(!activePlace)return
      state.departure.priceForSeats += price;
      state.departure.price += price;
      state.departure.activeSeats =[ ...departureSeats , {
        'coach_id': departureSeats[0].coach_id,
        direction: departureSeats[0].direction,
        "person_info": {
          'first_name': '',
          'last_name': '',
          'patronymic':'',
          birthday: '',
          gender: true,
          document_type:'паспорт',
          document_data : '',
          is_adult: true,
        },
        seat_number: activePlace,
        is_child: false,
      }]


    },
    deleteSeat: (state, action) => {
      const departureSeats = state.departure.activeSeats;
      const price = departureSeats.length
        ? state.departure.priceForSeats / departureSeats.length
        : 0;

      state[action.payload.direction].activeSeats = state[action.payload.direction].activeSeats.filter(
        ({seat_number}) => seat_number != action.payload.seat_number
      );

      state.departure.priceForSeats -= price;
      state.departure.price -= price;
    },
    addService: (state, action) => {
      const direction = action.payload.direction || 'departure';

      if (!state[direction].services[action.payload.id]) state[direction].services[action.payload.id] = {}
      state[direction].services[action.payload.id]   [action.payload.name] = action.payload.price


      state[direction].price += action.payload.price
    },
    deleteService: (state, action) => {
      const direction = action.payload.direction || 'departure';

      delete state[direction].services[action.payload.id][action.payload.name]
      state[direction].price -= action.payload.price
    },
    reset: (state, action) => {
      const direction = action.payload.direction || 'departure';

      state[direction].activeSeats = [];
      state[direction].price -= state[direction].priceForSeats;
      state[direction].priceForSeats = 0;
      state[direction].seats.forEach((wagon) => {
        wagon.seats.forEach((seat) => {
          seat.isActive = false;
        });
      });
    },
    changeAge: (state, action) => {
      const item = state[action.payload.direction].activeSeats.find(
        ({seat_number}) => seat_number === action.payload.seat_number
      )
      if (action.payload.age === 'Взрослый') {
        item.is_child = false;
        item.person_info.is_adult = true
      } else if (action.payload.age === 'Детский') {
        item.is_child = true;
        item.person_info.is_adult = false
      }
    },
    changePersonInfo: (state, action) => {
      const item = state[action.payload.direction].activeSeats.find(
        ({seat_number}) => seat_number === action.payload.seat_number
      )

      if(action.payload.name === 'document_type') {
        item.person_info.document_data = ''
      }
      item.person_info[action.payload.name] = action.payload.value

    },
    changeName: (state, action) => {
      const item = state[action.payload.direction].activeSeats.find(
        ({seat_number}) => seat_number === action.payload.seat_number
      )
     item.person_info[action.payload.name] = action.payload.value
    },
    changeGender: (state, action) => {
      const item = state[action.payload.direction].activeSeats.find(
        ({seat_number}) => seat_number === action.payload.seat_number
      )
      item.person_info.gender = action.payload.gender

    },
    changeBirthday: (state, action) => {
      const item = state[action.payload.direction].activeSeats.find(
        ({seat_number}) => seat_number === action.payload.seat_number
      )
      item.person_info
    }


  }
  ,
  extraReducers: (builder) => {
    builder.addCase(getSeats.fulfilled, (state, action) => {


      state.departure.seats = action.payload.data;
      state.ticket = action.payload.ticket;

      if (action.payload.ticket.arrival) {
        state.arrival = {
          seats: action.payload.data,
          price: 0,
          activeSeats: [],
          priceForSeats: 0,
          services: {}
        };
      }
    })
  }
})


export const {
  actions: ticketActions,
  reducer: tickerReducer
} = ticketSlice