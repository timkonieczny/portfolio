import LocalizedStrings from "react-localization"

const home = new LocalizedStrings({
    en: {
        message: "Get in touch",
        work: "Work",
        services: "Services",
        about: "About",
        privacy: "Privacy statement and legal notice",
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
        headline: "Services",
        intro: "Got ideas for the web of tomorrow? Let me help you turn them into reality!",
        section1: {
            headline: "3D on the web",
            intro: "I can help you implement innovative 3D concepts - from prototype to finished product.",
            ul: {
                li1: "Consulting, conception and implementation",
                li2: "Visualization of 3D models and scenes",
                li3: "Interaction and animation",
                li4: "3D data visualization",
                li5: "Game development",
                li6: "Virtual- und augmented reality",
                li7: "360° content",
                li8: "Visual effects and shader programming",
            }
        },
        section2: {
            headline: "Front-end development",
            intro: "I can help you develop web apps and websites that represent you, your business or your product perfectly.",
            ul: {
                li1: "Consulting, conception and implementation",
                li2: "Interactive web apps with a special focus on intuitivity und user experience",
                li3: "One page applications",
                li4: "Implementation of design templates",
                li5: "Animations",
                li6: "Responsive web design",
                li7: "Digital experiences that push the boundaries of conventional websites"
            }
        },
        technologies: "Here are some of my favorite technologies:"
    },
    de: {
        headline: "Leistungen",
        intro: "Sie haben Ideen für das Internet von morgen? Ich helfe Ihnen gerne dabei, sie zur Realität zu machen!",
        section1: {
            headline: "3D im Web",
            intro: "Ich helfe Ihnen, innovative 3D-Konzepte umzusetzen - vom Prototyp zum finalen Produkt.",
            ul: {
                li1: "Beratung, Konzeption und Umsetzung",
                li2: "Darstellung von 3D-Modellen und -Szenen",
                li3: "Interaktion und Animation",
                li4: "3D-Datenvisualisierung",
                li5: "Game Development",
                li6: "Virtual- und Augmented Reality",
                li7: "360°-Inhalte",
                li8: "Visuelle Effekte und Shaderprogrammierung",
            }
        },
        section2: {
            headline: "Front-end-Entwicklung",
            intro: "Ich helfe Ihnen bei der Entwicklung von Web Apps und Websites, die Sie, Ihr Unternehmen oder ihr Produkt perfekt repräsentieren.",
            ul: {
                li1: "Beratung, Konzeption und Umsetzung",
                li2: "Interaktive Websites mit Fokus auf Intuitivität und User Experience",
                li3: "One-Page-Applikationen",
                li4: "Passgenaue Umsetzung von Designs",
                li5: "Animationen",
                li6: "Responsive Webdesign",
                li7: "Digital experiences, die über konventionelle Websites hinausgehen"
            }
        },
        technologies: "Mit diesen Technologien arbeite ich besonders gerne:"


    }
})

const message = new LocalizedStrings({
    en: {
        headline: "Get in touch",
        intro: "Want to work with me? Or just say hello? Drop me a line, I'll get back to you soon.",
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
        intro: "Sie möchten mit mir zusammenarbeiten oder wollen einfach nur Hallo sagen? Schreiben Sie mir ein paar Zeilen, ich melde mich umgehend bei Ihnen.",
        subject: "Betreff",
        messageText: "Nachricht",
        messageThankYou: "Vielen Dank für Ihre Nachricht.",
        messageReply: "Ich melde mich umgehend bei Ihnen.",
        messageSorry: "Entschuldigen Sie die Störung.",
        messageErrorUnknown: "Oh. Da ist wohl etwas schiefgelaufen.",
        messageError400: "Der Server hat Ihre Daten abgelehnt.",
        messageErrorTryAgain: "Bitte versuchen Sie es später nochmal.",
    }
})

const about = new LocalizedStrings({
    en: {
        headline: "About",
        aboutText1: "Hi, I'm Tim Konieczny, Freelance Software Engineer specializing on 3D and front-end.",
        aboutText2: "The internet has the power to democratize brand-new, innovative concepts and make them available to anyone. Over time I've developed a deep passion for ideas and technologies that push the boundaries of modern web development.",
        aboutText3: "Freelancing allows me to work on projects in which I can convert this passion into reality. Through academic degrees (B.Sc Computer Science and Media and M.Sc Visual Computing) and years of experience in web projects, I've developed a deep understanding of 3D and front-end development, as well as wide-spread hands-on expertise.",
        aboutText4: "When I'm not working I get inspired by things that allow me to leave my comfort zone and grow. I love visiting events, and to travel, diving head-first into foreign cultures."
    },
    de: {
        headline: "Über mich",
        aboutText1: "Hallo, ich bin Tim Konieczny, Freelance Software Engineer mit Fokus auf 3D und Front-end.",
        aboutText2: "Das Internet hat die Kraft, neue, innovative Konzepte der breiten Masse zugänglich zu machen. Ich interessiere mich schon seit Langem für Ideen und Technologien, die den Rahmen konventioneller Webentwicklung sprengen.",
        aboutText3: "Ich arbeite freiberuflich an Projekten, in denen ich diese Leidenschaft zum Beruf machen kann. Durch Studienabschlüsse in Medieninformatik (B.Sc) und Visual Computing (M.Sc), und langjährige Erfahrung in der Webentwicklung, biete ich sowohl tiefgreifendes Verständnis im Bereich der 3D- und Front-end-Entwicklung, aber auch weitreichende praktische Expertise.",
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
        privacyStatementText: "Diese Website nutzt Google Analytics, ein Dienst, der Trafficdaten zur Analyse an Google-Server übermittelt. Diese Instanz von Google Analytics identifiziert keine individuellen Nutzer und assoziiert Ihre IP-Adresse nicht mit Daten, die Google über Sie hält. Die Berichte, die von Google Analytics generiert werden, werden genutzt um den Traffic und die Nutzung dieser Website besser zu verstehen. Sie können die Erfassung der Daten jederzeit beenden indem Sie die \"Do Not Track\"-Option Ihres Browsers aktivieren.",
        legalInfo: "Impressum"
    }
})

export { home, about, message, privacy, services, work }