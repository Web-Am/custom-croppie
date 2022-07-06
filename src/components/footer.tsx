
export default function FooterBar(props: any) {


    const Links2 = () => {
        return <>
            <li className="nav-item"><a className="nav-link text-muted"
                href="https://www.instagram.com/marche_andrea/" ><i className="fa-brands fa-instagram fa-2x"></i></a>
            </li>
        </>
    }

    return <footer className="bg-dark position-relative mt-auto position-relative" style={{ top: '150px' }}>
        <div />
        <div className="bg-dark-overlay-3 mt-5">

            <div className="container">
                <div className="row align-items-center justify-content-md-between py-4">
                    <div className="col-md-6">

                        <div className="d-none d-md-block text-md-center text-start text-primary-hover text-muted">©2022 <a
                            href="https://www.marchesanandrea.altervista.org/" className="text-reset btn-link"
                            target="_blank"><b>Who made this?</b></a><br /> Tutti i diritti riservati
                        </div>
                        <ul className=" d-block d-md-none text-md-start d-flex flex-column justify-content-center mt-3 mt-md-0">

                            <li className="nav-link text-muted " style={{ padding: '0.5rem 1rem !important' }}>©2022 <a
                                href="https://www.marchesanandrea.altervista.org/" className="  text-reset btn-link"
                                target="_blank"><b>Who made this?</b></a><br /> Tutti i diritti riservati</li>
                        </ul>
                    </div>
                    <div className="col-md-3 ">
                        <ul className="d-none d-md-block nav text-primary-hover text-center text-sm-end justify-content-center justify-content-center mt-3 mt-md-0">
                            <Links2 />
                        </ul>
                        <ul className="d-block d-md-none text-md-start d-flex flex-column justify-content-center mt-3 mt-md-0">
                            <Links2 />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}