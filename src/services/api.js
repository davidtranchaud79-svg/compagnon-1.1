
import axios from 'axios'

const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL
const API_TOKEN = import.meta.env.VITE_APPS_SCRIPT_TOKEN

async function callAPI(action, data = {}) {
  const res = await axios.post(API_URL, { token: API_TOKEN, action, data })
  return res.data
}

export const api = {
  listMembers: () => callAPI('listMembers'),
  listCotisations: () => callAPI('listCotisations'),
  addCotisation: (data) => callAPI('addCotisation', data),
  listLogements: () => callAPI('listLogements'),
  listReservations: () => callAPI('listReservations'),
  listBanquetJuin: () => callAPI('listBanquetJuin'),
  listBanquetNovembre: () => callAPI('listBanquetNovembre'),
  listEvents: () => callAPI('listEvents'),
  listSocial: () => callAPI('listSocial'),
  generateInvoice: (c) => callAPI('generateInvoice', c),
  generateRecuFiscal: (c) => callAPI('generateRecuFiscal', c),
  generateContract: (r) => callAPI('generateContract', r),
  generateQuittance: (r) => callAPI('generateQuittance', r),
}
