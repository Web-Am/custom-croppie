import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Croppie from "croppie"
import "croppie/croppie.css"
import $ from 'jquery';
import FooterBar from './components/footer';

function makeid(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

class Modello {
  id?: string;
  url?: string;
  pic?: string;

  constructor(id: string) {
    this.id = id;
    this.url = "";
    this.pic = "";
  }
}

export default function MyApp() {

  const [data, setData] = useState<Modello[]>([]);
  const [selected, setSelected] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sizeX, setSizeX] = useState(480);
  const [sizeY, setSizeY] = useState(270);
  const [content, setCotent] = useState();
  const [croppie, setCroppie] = useState<Croppie | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const refresh = () => {

    croppie?.destroy();
    const el = document.getElementById("upload-demo");
    if (el) {
      let c = new Croppie(el, {
        enableExif: true,
        viewport: {
          height: sizeY,
          width: sizeX,
        },
        boundary: {
          height: 980,
          width: 670,
        }
      });

      setCroppie(c);
      c.bind({
        url: content ? content : ""
      }).then(function () {
        console.log('jQuery bind complete');
      });
    }
  }

  const onChangeFileInput = (element: Modello, files: any) => {

    if (files && files[0]) {
      setIsLoading(true);
      setSelected(element.id);

      var reader = new FileReader();
      reader.onload = function (e: any) {
        $("#modal-work").modal("show");
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            const el = document.getElementById("upload-demo");
            if (el) {
              croppie?.destroy();
              let c = new Croppie(el, {
                enableExif: true,
                viewport: {
                  height: sizeY,
                  width: sizeX,
                },
                boundary: {
                  height: 690,
                  width: 690,
                }
              });

              setCroppie(c);
              setCotent(e.target.result);
              c.bind({
                url: e.target.result
              }).then(function () {
                console.log('jQuery bind complete');
              });
            }
          }, 140);
        }, 1000);
      }

      reader.readAsDataURL(files[0]);
    }
  }

  const download = (el: Modello) => {
    var a = document.createElement("a"); //Create <a>
    a.href = el.pic ? el.pic : ""; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
  }

  const add = () => {
    let id = makeid(9);
    setData([...data, new Modello(id)]);

    setTimeout(() => {
      if (data.length > 1) {
        var scrollDiv = document.getElementById(id)?.offsetTop;
        window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
      }
    }, 150);
  }
  const remove = (el: Modello) => {
    setData(data.filter(x => x.id != el.id));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  }

  const onSave = () => {

    croppie?.result({
      type: 'base64',
      format: 'jpeg',
      size: {
        height: sizeX,
        width: sizeY,
      }
    })
      .then((result: string) => {
        setData(
          data.map(item =>
            item.id === selected
              ? { ...item, pic: result }
              : item
          ))
        $("#modal-work").modal("hide");
      });
  }

  return <div className="d-flex flex-column min-vh-100">
    <img src="./draw1.svg" className="position-fixed" style={{ bottom: 0, right: 0, zIndex: - 1 }} />
    <img src="./draw2.svg" className="position-fixed" style={{ bottom: 0, left: 0, zIndex: -1 }} />

    <div className="container w-75 mx-auto mt-5 text-center">
      <span className='display-4 mx-auto font-weight-bold text-313131' > Fai magie con le pics</span>
      {
        data.map((el, idx) => {
          return <div className='my-3' key={idx}>
            <div className="card shadow" id={el.id}>
              {
                el.pic && <div className="card-body text-center">

                  < button className="btn btn-sm btn-danger float-right" onClick={(e) => remove(el)} > Elimina</button>

                  <figure>
                    <img src={el.pic} />
                  </figure>

                  < button className="btn btn-lg btn-success mx-3" onClick={(e) => download(el)} > Scarica</button>
                </div>
              }
              {
                !el.pic && <div className="card-body text-center">
                  < button className="btn btn-sm btn-danger float-right" onClick={(e) => remove(el)} > Elimina</button>

                  <h1 style={{ fontWeight: 300 }}>  Seleziona un'immagine e ridimensionala</h1> <h2 style={{ fontWeight: 300 }}>Forsaaaaa!</h2>

                  <div className="my-5 mx-auto" style={{ maxWidth: '400px' }}>
                    <input className="form-control-file-input" id="file_input" accept="image/*" type="file" onChange={(e: any) => onChangeFileInput(el, e.target.files)} />
                  </div>
                </div>
              }
            </div>
          </div>
        })
      }
      <div>





        <button type="button" className="btn btn-dark  mx-auto btn-lg my-5" onClick={add}>
          Aggiungi immagine
        </button>


      </div>
    </div>

    <FooterBar />


    <div className="modal fade" id="modal-work" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Ritaglia l'immagine appena caricata</h5>
            <button type="button" className="btn btn-sm btn-light fw-bold" data-dismiss="modal" aria-label="Close">X</button>

          </div>
          <div className="modal-body">

            {isLoading && <div className="d-flex align-items-center m-4">
              <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
            }
            {!isLoading &&

              <div>
                <div id="upload-demo" className="w-100"></div>
                <div className='d-flex flex-column'>
                  <input type="number" className="form-label" value={sizeX} onChange={(e) => setSizeX(Number(e.target.value))} min={0} max={3333} />
                  <input type="range" className="form-range" value={sizeX} onChange={(e) => setSizeX(Number(e.target.value))} min={0} max={3333} />
                  <input type="number" className="form-label" value={sizeY} onChange={(e) => setSizeY(Number(e.target.value))} min={0} max={3333} />
                  <input type="range" className="form-range" value={sizeY} onChange={(e) => setSizeY(Number(e.target.value))} min={0} max={3333} />
                </div>
                < button className="btn btn-lg btn-success m-3" onClick={refresh} > Refresh</button>
              </div>
            }

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onSave}>Ritaglia</button>
          </div>
        </div>
      </div>
    </div>

  </div>
}