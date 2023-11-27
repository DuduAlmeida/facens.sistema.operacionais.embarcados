import express from 'express'
import cors from "cors"
import { initDB } from './database/init'

import routes from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './swagger.json'

const app = express()

app.use(express.json())
app.use(cors())

initDB()

app.use("/flightapp", routes)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));


const PORT = 3001

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})