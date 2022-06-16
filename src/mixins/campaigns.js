import dateMixin from './date'
export default {
  mixins: [dateMixin],
  methods: {
    constructCampaignObject(data) {
      return data.map((campaign) => {
        return {
          id: campaign.id,
          name: campaign.get('name'),
          description: campaign.get('description'),
          website: campaign.get('website'),
          network: campaign.get('network'),
          amount: campaign.get('amount'),
          commission: campaign.get('commission'),
          type: campaign.get('type'),
          product: campaign.get('product').get('name'),
          mine: campaign.get('mine'),
          startDate: this.formatDate(campaign.get('startDate')),
          endDate: this.formatDate(campaign.get('endDate')),
        }
      })
    },
  },
}
