import {createSlice} from "@reduxjs/toolkit";
import {getSeats} from "../thunks/getSeats.js";


const ticketSlice = createSlice({
  name: "TICKET",
  initialState: {
    personalData: {

    },
    routeId: "",
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

      const wagon = state[direction].seats.find(
        ({coach}) => coach.name == action.payload.name
      );

      if (!wagon) return;

      const seat = wagon.seats.find(
        ({index}) => index == action.payload.index
      );

      if (!seat) return;

      const price = action.payload.price;
      const isActive = seat.isActive;

      if (isActive) {
        state[direction].price -= price;
        state[direction].priceForSeats -= price;

        state[direction].activeSeats = state[direction].activeSeats.filter(
          ({coach_id, seat_number}) =>
            !(coach_id === wagon.coach._id &&
              seat_number === action.payload.index)
        );
      } else {
        state[direction].price += price;
        state[direction].priceForSeats += price;

        state[direction].activeSeats.push({
          coach_id: wagon.coach._id,
          direction,
          person_info: {
            first_name: '',
            last_name: '',
            patronymic: '',
            birthday: '',
            gender: true,
            document_type: 'паспорт',
            document_data: '',
            is_adult: action.payload.type === 'adult'
          },
          is_child: action.payload.type === 'child',
          seat_number: action.payload.index
        });
      }

      seat.isActive = !isActive;
    },

    addSeat: (state, action) => {
      const departureSeats = state.departure.activeSeats;
      const price = departureSeats.length
        ? state.departure.priceForSeats / departureSeats.length
        : 0;

      const emptyPlace = action.payload.emptyPlace;

      state.departure.seats = state.departure.seats.map((w) => {
        return {
          ...w,
          seats: w.seats.map((s) => {
            if (s.index === emptyPlace) {
              return {
                ...s,
                isActive: true,
              };
            }
            return s;
          }),
        };
      });

      state.departure.priceForSeats += price;
      state.departure.price += price;
      state.departure.activeSeats = [
        ...departureSeats, {
          'coach_id': departureSeats[0].coach_id,
          direction: departureSeats[0].direction,
          "person_info": {
            'first_name': '',
            'last_name': '',
            'patronymic': '',
            birthday: '',
            gender: true,
            document_type: 'паспорт',
            document_data: '',
            is_adult: true,
          },
          seat_number: emptyPlace,
          is_child: false,
        }
      ]


    },
    deleteSeat: (state, action) => {
      const departureSeats = state.departure.activeSeats;
      const price = departureSeats.length
        ? state.departure.priceForSeats / departureSeats.length
        : 0;

      state[action.payload.direction].activeSeats
        = state[action.payload.direction].activeSeats.filter(
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

      if (action.payload.name === 'document_type') {
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

    ,
    updateSeatsTwo: (state, action) => {
      action.payload.data.forEach((item) => {
        const i =
          state[item.direction].activeSeats.find(({coach_id, seat_number}) =>
            item.coach_id === coach_id && item.seat_number === seat_number);
        i.person_info.birthday = item.birthday;
        i.person_info.first_name = item.firstName;
        i.person_info.last_name = item.lastName;
        i.person_info.patronymic = item.patronymic;
        i.person_info.document_type = item.document_type;
        i.person_info.gender = item.gender;

        if(item.document_type === 'паспорт') i.person_info.document_data = item.document_series + ' ' + item.document_number;
        else  i.person_info.document_data = item.document_data;
      });
    },
    saveInfo: (state, action)  => {
      state.personalData = action.payload;
    },
    saveRouteId: (state, action) => {
      state.routeId = action.payload;
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