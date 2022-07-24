const ENDPOINT = import.meta.env.VITE_ENDPOINT;

export default {
  channels: [
    {
      type: "TypeChannelsGroup",
      channels: [
        {
          data: [
            {
              children: [{text: "Crea un nuevo log!"}],
              type: "paragraph",
              language: "text",
            },
            {date: "Sat May 21 2022"},
          ],
          type: "typechannel",
          name: "NameChannel",
          id: "1653175367559",
        },
        {
          data: [
            {
              children: [{text: "Crea un nuevo log!"}],
              type: "paragraph",
              language: "text",
            },
            {date: "Sat May 21 2022"},
          ],
          type: "typechannel dos",
          name: "NameChannel dos",
          id: "1653175367552",
        },
      ],
    },
    {
      type: "TypeChannelsGroup",
      channels: [
        {
          data: [
            {
              children: [{text: "Crea un nuevo log!"}],
              type: "paragraph",
              language: "text",
            },
            {date: "Sat May 21 2022"},
          ],
          type: "typechannel",
          name: "NameChannel",
          id: "1653175367559",
        },
        {
          data: [
            {
              children: [{text: "Crea un nuevo log!"}],
              type: "paragraph",
              language: "text",
            },
            {date: "Sat May 21 2022"},
          ],
          type: "typechannel dos",
          name: "NameChannel dos",
          id: "1653175367552",
        },
      ],
    },
    {
      type: "TypeChannelsGroup",
      channels: [
        {
          data: [
            {
              children: [{text: "Crea un nuevo log!"}],
              type: "paragraph",
              language: "text",
            },
            {date: "Sat May 21 2022"},
          ],
          type: "typechannel",
          name: "NameChannel",
          id: "1653175367559",
        },
        {
          data: [
            {
              children: [{text: "Crea un nuevo log!"}],
              type: "paragraph",
              language: "text",
            },
            {date: "Sat May 21 2022"},
          ],
          type: "typechannel dos",
          name: "NameChannel dos",
          id: "1653175367552",
        },
      ],
    },
    {
      type: "TypeChannelsGroup",
      channels: [
        {
          data: [
            {
              children: [{text: "Crea un nuevo log!"}],
              type: "paragraph",
              language: "text",
            },
            {date: "Sat May 21 2022"},
          ],
          type: "typechannel",
          name: "NameChannel",
          id: "1653175367559",
        },
        {
          data: [
            {
              children: [{text: "Crea un nuevo log!"}],
              type: "paragraph",
              language: "text",
            },
            {date: "Sat May 21 2022"},
          ],
          type: "typechannel dos",
          name: "NameChannel dos",
          id: "1653175367552",
        },
      ],
    },
  ],

  getChannels: async function () {
    try {
      return this.channels;
    } catch (error) {
      throw error;
    }
  },

  getChannelsType: async function (channelType: String) {
    try {
      return {channelType: channelType, channels: this.channels};
    } catch (error) {
      throw error;
    }
  },
};
