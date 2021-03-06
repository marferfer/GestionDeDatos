package es.urjc.code.pokedex;

public class Order {
	private String orden;
	private int[] generacion;
	private String[] tipo;
	private boolean legendario;

	public Order(String orden, int[] generacion, String[] tipo, boolean legendario) {
		super();
		this.orden = orden;
		this.generacion = generacion;
		this.tipo = tipo;
		this.legendario = legendario;
	}

	public String getOrden() {
		return orden;
	}

	public void setOrden(String orden) {
		this.orden = orden;
	}

	public int[] getGeneracion() {
		return generacion;
	}

	public void setGeneracion(int[] generacion) {
		this.generacion = generacion;
	}

	public String[] getTipo() {
		return tipo;
	}

	public void setTipo(String[] tipo) {
		this.tipo = tipo;
	}

	public boolean isLegendario() {
		return legendario;
	}

	public void setLegendario(boolean legendario) {
		this.legendario = legendario;
	}

	@Override
	public String toString() {
		return "Order [orden=" + orden + ", generacion=" + generacion + ", tipo=" + tipo + ", legendario=" + legendario
				+ "]";
	}
}
