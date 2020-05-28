import LocalizedStrings from "react-localization"

const home = new LocalizedStrings({
    en: {
        message: "Get in touch",
        work: "Work",
        services: "Services",
        about: "About",
        privacy: "Privacy statement and legal information",
        location: "Leipzig, Germany"
    },
    de: {
        message: "Projekt anfragen",
        work: "Portfolio",
        services: "Leistungen",
        about: "Über mich",
        privacy: "Datenschutz und Impressum",
        location: "Leipzig"
    }
})

const work = new LocalizedStrings({
    en: {
        headline: "Work"
    },
    de: {
        headline: "Portfolio"
    }
})

const services = new LocalizedStrings({
    en: {
        headline: "Services"
    },
    de: {
        headline: "Leistungen",
    }
})

const message = new LocalizedStrings({
    en: {
        headline: "Get in touch",
        subject: "Subject",
        messageText: "Message",
        messageThankYou: "Thank you for your message.",
        messageReply: "I'll get back to you as soon as possible!",
        messageSorry: "Sorry for the inconvenience.",
        messageErrorUnknown: "Uh. Oh. Something went wrong.",
        messageError400: "The server has rejected the data you entered.",
        messageErrorTryAgain: "Please try again later.",
    },
    de: {
        headline: "Projekt anfragen",
        subject: "Betreff",
        messageText: "Nachricht",
        messageThankYou: "Vielen Dank für deine Nachricht.",
        messageReply: "Ich werde dir schnellstmöglich antworten!",
        messageSorry: "Entschuldige die Unannehmlichkeiten.",
        messageErrorUnknown: "Oh. Da ist wohl etwas schiefgelaufen.",
        messageError400: "Der Server hat deine Daten abgelehnt.",
        messageErrorTryAgain: "Bitte versuche es später nochmal.",
    }
})

const about = new LocalizedStrings({
    en: {
        headline: "About",
        aboutText1: "Hi, I'm Tim Konieczny, Freelance Software Engineer specializing on 3D and frontend.",
        aboutText2: "The internet has the power to democratize brand-new, innovative concepts and make them available to anyone. Over time I've developed a deep passion for ideas and technologies that push the boundaries of modern web development.",
        aboutText3: "Freelancing allows me to work on projects in which I can convert this passion into reality. Through academic degrees (B.Sc Computer Science and Media and M.Sc Visual Computing) and years of experience in web projects, I've developed a deep understanding of 3D and frontend development, as well as wide-spread hands-on expertise.",
        aboutText4: "When I'm not working I get inspired by things that allow me to leave my comfort zone and grow. I love visiting events, and to travel, diving head-first into foreign cultures."
    },
    de: {
        headline: "Über mich",
        aboutText1: "Hallo, ich bin Tim Konieczny, Freelance Software Engineer mit Fokus auf 3D und Frontend.",
        aboutText2: "Das Internet hat die Kraft, neue, innovative Konzepte der breiten Masse zugänglich zu machen. Ich interessiere mich schon seit Langem für Ideen und Technologien, die den Rahmen konventioneller Webentwicklung sprengen.",
        aboutText3: "Ich arbeite freiberuflich an Projekten, in denen ich diese Leidenschaft zum Beruf machen kann. Durch Studienabschlüsse in Medieninformatik (B.Sc) und Visual Computing (M.Sc), und langjährige Erfahrung in der Webentwicklung, biete ich sowohl tiefgreifendes Verständnis im Bereich der 3D- und Frontend-Entwicklung, aber auch weitreichende praktische Expertise.",
        aboutText4: "Neben meiner Arbeit inspirieren mich Dinge, die mich aus meiner Komfortzone herausholen und an denen ich wachsen kann. Ich liebe es, auf Veranstaltungen zu gehen und auf Reisen kopfüber in fremde Kulturen zu springen."
    }
})

const privacy = new LocalizedStrings({
    en: {
        headline: "Privacy statement and legal information",
        privacyStatement: "Privacy statement",
        privacyStatementText: "This website uses Google Analytics, a service which transmits website traffic data to Google servers. This instance of Google Analytics does not identify individual users or associate your IP address with any other data held by Google. Reports provided by Google Analytics are used to help understand website traffic and webpage usage. You may opt out of this tracking at any time by activating the \"Do Not Track\" setting in your browser.",
        legalInfo: "Legal information"
    },
    de: {
        headline: "Datenschutz und Impressum",
        privacyStatement: "Datenschutzhinweis",
        privacyStatementText: "Diese Website nutzt Google Analytics, ein Dienst, der Trafficdaten zur Analyse an Google-Server übermittelt. Diese Instanz von Google Analytics identifiziert keine individuellen Nutzer und assoziiert deine IP-Adresse nicht mit Daten, die Google über dich hält. Die Berichte, die von Google Analytics generiert werden, werden genutzt um den Traffic und die Nutzung dieser Website besser zu verstehen. Du können die Erfassung der Daten jederzeit beenden indem du die \"Do Not Track\"-Option deines Browsers aktivierst.",
        legalInfo: "Impressum"
    }
})

export { home, about, message, privacy, services, work }