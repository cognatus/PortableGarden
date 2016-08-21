package edu.ipn.mx.portablegardenmobile;

import android.app.ActionBar;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.github.nkzawa.emitter.Emitter;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;


public class stats extends ActionBarActivity {

    Switch swAgua;
    Switch swLuz;
    Switch swVentiladores;
    Switch swCortinas;
    Button boton;
    Button boton2;
    String piso = "1";
    TextView pisoText;
    TextView tempText;
    TextView humText;
    TextView luzText;

    private Socket mSocket;
    {
        try {
            mSocket = IO.socket("http://192.168.1.115:3000/");
        } catch (URISyntaxException e) {
            throw new RuntimeException("Esto "+e);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stats);
        mSocket.connect();

        /*mSocket.on("sensor1", imprimeDatos);
        mSocket.on("sensor2", imprimeDatos2);*/

        swAgua = (Switch) this.findViewById(R.id.id_swAgua);
        swLuz = (Switch) this.findViewById(R.id.id_swLuz);
        swVentiladores = (Switch) this.findViewById(R.id.id_swVentiladores);
        swCortinas = (Switch) this.findViewById(R.id.id_swCortinas);

        //boton = (Button) this.findViewById(R.id.id_boton1);
        //boton2 = (Button) this.findViewById(R.id.id_boton2);
        pisoText = (TextView) this.findViewById(R.id.id_piso);
        /*tempText = (TextView) this.findViewById(R.id.id_temp);
        humText = (TextView) this.findViewById(R.id.id_hum);
        luzText = (TextView) this.findViewById(R.id.id_luz);*/

        /*boton.setOnClickListener(
                new View.OnClickListener(){

                    @Override
                    public void onClick(View v) {

                        if(piso != "1") {
                            selecPiso1();
                        }

                    }
                }
        );

        boton2.setOnClickListener(
                new View.OnClickListener(){

                    @Override
                    public void onClick(View v) {

                        if(piso != "2") {
                            selecPiso2();
                        }
                    }
                }
        );*/

    }

    /*protected void selecPiso1() {

        piso = "1";
        Toast.makeText(this, "Seleccionaste el Piso 1", Toast.LENGTH_SHORT).show();
        pisoText.setText("Piso: 1");
        swAgua.setChecked(false);
        swLuz.setChecked(false);
        swVentiladores.setChecked(false);
        swCortinas.setChecked(false);

    }

    protected void selecPiso2() {

        piso = "2";
        Toast.makeText(this, "Seleccionaste el Piso 2", Toast.LENGTH_SHORT).show();
        pisoText.setText("Piso: 2");
        swAgua.setChecked(false);
        swLuz.setChecked(false);
        swVentiladores.setChecked(false);
        swCortinas.setChecked(false);

    }*/

    //Eventos del switch

    public void clickAgua(View view) {
        // Is the toggle on?
        swAgua = (Switch) this.findViewById(R.id.id_swAgua);
        boolean on = swAgua.isChecked();

        if (on) {
            Toast.makeText(this, "Le puchurraste al agua", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Le despuchurraste al agua", Toast.LENGTH_SHORT).show();
        }

        mSocket.emit("write", "b", piso, on);
    }

    public void clickLuz(View view) {
        // Is the toggle on?
        swAgua = (Switch) this.findViewById(R.id.id_swLuz);
        boolean on = swAgua.isChecked();

        if (on) {
            Toast.makeText(this, "Le puchurraste a la luz", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Le despuchurraste a la luz", Toast.LENGTH_SHORT).show();
        }

        mSocket.emit("write", "l", piso, on);
    }

    public void clickVentiladores(View view) {
        // Is the toggle on?
        swAgua = (Switch) this.findViewById(R.id.id_swVentiladores);
        boolean on = swAgua.isChecked();

        if (on) {
            Toast.makeText(this, "Le puchurraste a los ventiladores", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Le despuchurraste a los ventiladores", Toast.LENGTH_SHORT).show();
        }

        mSocket.emit("write", "v", piso, on);
    }

    //evento cortina
    public void clickCortina(View view) {
        // Is the toggle on?
        swAgua = (Switch) this.findViewById(R.id.id_swCortinas);
        boolean on = swAgua.isChecked();

        if (on) {
            Toast.makeText(this, "Le puchurraste a la cortina", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Le despuchurraste a la cortina", Toast.LENGTH_SHORT).show();
        }

        mSocket.emit("write", "c", piso, on);
    }

    //terminan los eventos del switch

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_stats, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    //evento cuando recibe datos y assi

    /*private Emitter.Listener imprimeDatos = new Emitter.Listener(){

        @Override
        public void call(Object... args) {
            JSONObject data = (JSONObject) args[0];
            try {
                if (piso == "1") {
                    tempText.setText(data.getString(""));
                    humText.setText(data.getString(""));
                    luzText.setText(data.getString(""));
                }
            } catch (JSONException e) {
                return;
            }
        }
    };

    private Emitter.Listener imprimeDatos2 = new Emitter.Listener(){

        @Override
        public void call(Object... args) {
            JSONObject data = (JSONObject) args[0];
            try {
                if (piso == "2") {
                    tempText.setText(data.getString("data"));
                    humText.setText(data.getString(""));
                    luzText.setText(data.getString(""));
                }
            } catch (JSONException e) {
                return;
            }
        }
    };*/

    @Override
    public void onDestroy() {
        super.onDestroy();

        mSocket.disconnect();
    }
}
