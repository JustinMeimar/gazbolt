

-[] Fix stdin not completely hiding bug.
-[x] Add copy contents buttons to the output pannels.
-[] Add Warning when fetch to backend fails.
-[x] Condense control pannel into "one row" so editor takes up more space.
-[] Create a light mode for accessibility.
-[] Source the backend URL in a production quality way
-[] Add a small about section and make the existing home and logo clickable
-[] Determine a production deployment strategy given that:
    * The server should probably run in a firejail to restrict the ability
      of clients to launch programs which create files, cause fork bombs etc.
    * The server will be running on a CI machine on the university.
-[] Test for vulerbilities, DDOS attacks and implement some sort of request throttling if needed on the server side.
-[] Add cloudflare if needed to frontend access.
-[] Setup the Generator, SCalc, VCalc and Gazprea test programs.

