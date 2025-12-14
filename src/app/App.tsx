import "./App.css"
import { selectThemeMode } from "@/app/app-slice"
import { ErrorSnackbar, Header } from "@/common/components"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { Routing } from "@/common/components"
import * as z from "zod";


const User1 = z.object({
  email: z.email().max(20),
  password: z.string().min(3, 'Bro its too small').max(10, 'Made pass less'),
  rememberMe: z.boolean(),
  date: z.iso.datetime({local: true})
})

type User = z.infer<typeof User1>
try {
  const data: User = User1.parse({email: 'mailo-my@gmail.com', password: '1034', rememberMe: true, date: "2025-11-05T18:46:35.637" });
// console.log(data)
} catch (e) {
  console.log(e.issues)
}



export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
